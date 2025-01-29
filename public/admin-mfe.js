(function() {
  function mountApp({ element, options = {} }) {
    console.log('[MFE Debug] Starting mountApp with options:', options);
    const { baseURL, ...rest } = options;
    
    if (!baseURL) {
      throw Error('Please provide the baseURL in the options for the admin MFE to load');
    }

    function getAssetUrl(file) {
      return !file.startsWith('assets/') ? `${baseURL}assets/${file}` : `${baseURL}${file}`;
    }

    function loadScript(src) {
      return new Promise((resolve, reject) => {
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
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }

    function checkMount(retries = 10) {
      if (typeof window.mountApp === 'function') {
        console.log('[MFE Debug] mountApp function found, mounting app');
        return window.mountApp({ element, options: rest });
      }
      if (retries === 0) {
        throw new Error('React app mount function not found after multiple retries');
      }
      console.log(`[MFE Debug] Waiting for mountApp function... (${retries} retries left)`);
      return new Promise(resolve => setTimeout(() => resolve(checkMount(retries - 1)), 300));
    }
    
    return fetch(`${baseURL}manifest.json`)
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

  window.mountApp = mountApp;
  console.log('[MFE Debug] Bootstrap mountApp function registered');
})();
