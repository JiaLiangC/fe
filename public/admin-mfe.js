// public/admin-mfe.js
(function() {
  window.reactAppInstance = window.reactAppInstance || null;

  function mountApp({ element, options = {} }) {
    console.log('[MFE Debug] mountApp: Starting mountApp with options:', options);
    const assetPrefix = '/';  // Hardcoded assetPrefix
    
    if (!element) {
      throw Error('[MFE Debug] mountApp: Mount element is required');
    }

    console.log("base url is "+assetPrefix)
    // if (!baseURL) {
      // throw Error('[MFE Debug] mountApp: Please provide the baseURL in the options for the admin MFE to load');
    // }

    // 如果已经有实例，直接返回并更新路由，并没有执行到
    if (window.reactAppInstance) {
      console.log('[MFE Debug] Reusing existing React instance just appendChild reactAppInstance');
      element.appendChild(reactAppInstance.element);
      return Promise.resolve(reactAppInstance);
    }

    // 创建或获取全局容器
    let globalContainer = document.getElementById('global-react-root');
    console.log("[MFE Debug] mountApp: globalContainer  found ..... ")
    if (!globalContainer) {
      console.log("[MFE Debug] mountApp: globalContainer not found ..... error")
    }

    function getAssetUrl(file) {
      return !file.startsWith('assets/') ? `${assetPrefix}assets/${file}` : `${assetPrefix}${file}`;
    }

    function loadScript(src) {
      return new Promise((resolve, reject) => {
        // 检查脚本是否已加载
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.type = 'module';
        script.src = src;
        script.onload = resolve;
        script.onerror = (err) => {
          const error = new Error(`Failed to load script: ${src}`);
          error.originalError = err;
          reject(error);
        };
        document.head.appendChild(script);
      });
    }

    function loadCSS(href) {
      // 检查样式是否已加载
      if (document.querySelector(`link[href="${href}"]`)) {
        return;
      }

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }

    function checkMount(retries = 10) {
      if (typeof window.mountApp === 'function') {
        console.log('[MFE Debug] mountApp function found, mounting app');
        return window.mountApp({ 
          element: element, 
          options: {
            ...options,
            onRouteChange: (path) => {
              // 通知 Ember 路由变化
              // window.postMessage({
                // type: 'reactRouteChanged',
                // path: path
              // }, window.location.origin);
            }
          }
        }).then(instance => {
          reactAppInstance = instance;
          return instance;
        });
      }
      if (retries === 0) {
        throw new Error('React app mount function not found after multiple retries');
      }
      console.log(`[MFE Debug] Waiting for mountApp function... (${retries} retries left)`);
      return new Promise(resolve => setTimeout(() => resolve(checkMount(retries - 1)), 300));
    }
    
    return fetch(`${assetPrefix}manifest.json`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch manifest: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!data['index.html'] || !data['index.html'].file) {
          throw new Error('Invalid manifest structure');
        }
        
        const entryModule = data['index.html'];
        
        // 加载 CSS
        if (entryModule.css) {
          entryModule.css.forEach(cssFile => loadCSS(getAssetUrl(cssFile)));
        }
        
        // 按顺序加载脚本
        const scripts = [
          ...(entryModule.imports || []).map(importFile => data[importFile].file),
          entryModule.file
        ];

        return scripts.reduce((promise, scriptFile) => {
          return promise.then(() => loadScript(getAssetUrl(scriptFile)));
        }, Promise.resolve())
        .then(() => checkMount());
      })
      .catch(error => {
        console.error('[MFE Debug] Critical error:', error);
        throw error;
      });
  }

  // 提供卸载方法
  mountApp.unmount = function() {
    if (reactAppInstance && reactAppInstance.unmount) {
      reactAppInstance.unmount();
      reactAppInstance = null;
    }
    if (window._mfeMessageHandler) {
      window.removeEventListener('message', window._mfeMessageHandler);
      delete window._mfeMessageHandler;
    }
  };

  window.mountApp = mountApp;
  console.log('[MFE Debug] Bootstrap mountApp function registered');
})();
