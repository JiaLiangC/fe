// main.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { i18nInit } from './i18n';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import './theme/index.less';

interface MountOptions {
  baseURL?: string;
  basename?: string;
  initialRoute?: string;
  onRouteChange?: (path: string) => void;
}

interface MountParams {
  element: HTMLElement;
  options?: MountOptions;
}

interface MFEInstance {
  unmount: () => void;
  history?: any;
}

// 创建一个全局的 history 实例
const history = createBrowserHistory();

// 定义 mountApp 函数
const mountApp = ({ element, options = {} as MountOptions }: MountParams): Promise<MFEInstance> => {
  console.log('[MFE Debug] Mounting app with options:', options);
  
  return new Promise((resolve, reject) => {
    try {
      // 监听路由变化
      const unlisten = history.listen((location) => {
        options.onRouteChange?.(location.pathname);
      });

      // 如果提供了初始路由，先设置
      if (options.initialRoute) {
        history.replace(options.initialRoute);
      }

      ReactDOM.render(
        <I18nextProvider i18n={i18nInit}>
          <App
            baseURL={options.baseURL}
            basename={options.basename}
            history={history}
            initialRoute={options.initialRoute}
          />
        </I18nextProvider>,
        element,
        () => {
          console.log('[MFE Debug] App rendered successfully');
          
          // 返回实例对象
          const instance: MFEInstance = {
            unmount: () => {
              console.log('[MFE Debug] Unmounting app');
              unlisten(); // 清理路由监听
              ReactDOM.unmountComponentAtNode(element);
            },
            history // 暴露 history 对象以供外部使用
          };

          resolve(instance);
        }
      );
    } catch (error) {
      console.error('[MFE Debug] Error mounting app:', error);
      reject(error);
    }
  });
};

// 注册到全局
if (typeof window !== 'undefined') {
  window.mountApp = mountApp;
  console.log('[MFE Debug] mountApp registered on window:', !!window.mountApp);
}

// 更新全局类型定义
declare global {
  interface Window {
    mountApp: typeof mountApp;
  }
}

export { mountApp };