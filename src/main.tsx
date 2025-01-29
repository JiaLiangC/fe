// main.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { i18nInit } from './i18n';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import './theme/index.less';


// 定义 mountApp 函数
const mountApp = ({ element, options = {} }) => {
  console.log('[MFE Debug] Mounting app with options:', options);
  
  return new Promise((resolve, reject) => {
    try {
      ReactDOM.render(
        <I18nextProvider i18n={i18nInit}>
          <App {...options} />
        </I18nextProvider>,
        element,
        () => {
          console.log('[MFE Debug] App rendered successfully');
          resolve({
            unmount: () => {
              console.log('[MFE Debug] Unmounting app');
              ReactDOM.unmountComponentAtNode(element);
            }
          });
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

declare global {
  interface Window {
    mountApp: typeof mountApp;
  }
}


export { mountApp };