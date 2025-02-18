/*
 * Copyright 2022 Nightingale Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { defineConfig, loadEnv } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { md } from './plugins/md';
import plusResolve from './plugins/plusResolve';
import prefixPlugin from './plugins/vite-plugin-prefix';

const reactSvgPlugin = require('./plugins/svg');

// 优化 chunks 分组，减少重复依赖
const chunk1 = [
  'react', 
  'react-router-dom', 
  'react-dom',
];

const uiChunk = [
  'antd',
  '@ant-design/icons',
  'moment',
];

const utilChunk = [
  'lodash',
  'umi-request',
  'ahooks',
  'color',
];

const visualChunk = [
  'react-grid-layout',
  'd3',
];

const editorChunk = [
  '@codemirror/autocomplete',
  '@codemirror/highlight',
  '@codemirror/lint',
  '@codemirror/language',
  '@codemirror/state',
  '@codemirror/view',
  'codemirror-promql',
  '@codemirror/basic-setup',
  'react-ace',
];

const excelChunk = ['file-saver', 'exceljs'];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // 后端接口地址
  // let proxyURL = 'http://121.37.30.227:8080';
  let proxyURL = 'http://localhost:8080';
  let fontFamily = '"Microsoft Yahei",Verdana,Helvetica Neue,sans-serif,PingFangSC-Regular,simsun,"sans-serif"';
  if (env.VITE_IS_PRO) {
    proxyURL = env.PROXY_PRO;
  } else if (env.VITE_IS_ENT) {
    proxyURL = env.PROXY_ENT;
    fontFamily = 'Helvetica Neue,sans-serif,PingFangSC-Regular,microsoft yahei ui,microsoft yahei,simsun,"sans-serif"';
  }

  const baseName = env.VITE_PREFIX || '';

  return {
    base: baseName + '/',
    plugins: [
      md(),
      reactRefresh(),
      plusResolve(),
      reactSvgPlugin({ defaultExport: 'component' }),
      //
      prefixPlugin(baseName),
    ],
    // 优化依赖预构建
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'antd',
        'lodash',
        '@ant-design/icons',
        // 添加更多频繁使用的依赖
        'moment',
        'ahooks',
        '@codemirror/state',
        '@codemirror/view',
        'codemirror-promql',
        'd3',
        'exceljs',
        'file-saver'
      ],
      // 开启依赖预构建缓存
      force: false,
      // 添加缓存目录
      cacheDir: 'node_modules/.vite'
    },
    define: {},
    resolve: {
      alias: [
        {
          find: '@assets',
          replacement: baseName,
        },
        {
          find: '@',
          replacement: '/src',
        },
      ],
    },
    server: {
      proxy: {
        '/api': {
          target: proxyURL,
          changeOrigin: true,
        },
      },
    },
    build: {
      // 启用构建缓存
      cache: true,
      // 使用更快的压缩器
      minify: 'esbuild',
      // 禁用 source map 加快构建
      sourcemap: false,
      // 启用多线程构建
      threads: true,
      // 设置构建缓存目录
      cacheDir: 'node_modules/.vite_build_cache',
      // 调整警告限制
      chunkSizeWarningLimit: 800,
      manifest: true,
      commonjsOptions: {
        ignoreTryCatch: false,
      },
      outDir: '../ambari-web/public/',
      rollupOptions: {
        external: ['#minpath', '#minproc'],
        output: {
          // 优化分包策略
          manualChunks: {
            'react-vendor': chunk1,
            'ui-vendor': uiChunk,
            'util-vendor': utilChunk,
            'visual-vendor': visualChunk,
            'editor-vendor': editorChunk,
            'excel-vendor': excelChunk,
          },
          // 优化资源输出
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
      // 修改目标环境为更现代的版本
      target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "/src/global.variable.less";`,
          javascriptEnabled: true,
          modifyVars: {
            'primary-color': '#6C53B1',
            'primary-background': '#F0ECF9',
            'disabled-color': 'rgba(0, 0, 0, 0.5)',
            'tabs-ink-bar-color': 'linear-gradient(to right, #9F4CFC, #0019F4 )',
            'font-size-base': '12px',
            'menu-item-font-size': '14px',
            'radio-button-checked-bg': '#EAE6F3',
            'form-item-margin-bottom': '18px',
            'font-family': fontFamily,
            'text-color': '#262626',
            'table-row-hover-bg': '#EAE8F2',
            'table-header-bg': '#f0f0f0',
            'select-selection-item-bg': '#EAE6F3',
            'select-selection-item-border-color': '#6C53B1',
            'menu-item-color': '#8C8C8C',
            'menu-inline-submenu-bg': '#f0f0f0',
            'menu-bg': '#f0f0f0',
            'checkbox-check-bg': '#fff',
            'checkbox-check-color': '#6C53B1',
            'checkbox-color': 'fade(@checkbox-check-color, 10)',
            'btn-padding-horizontal-base': '12px',
          },
        },
      },
    },
    // 修改 esbuild 配置
    esbuild: {
      // 修改目标环境为更现代的版本
      target: 'es2020',
      jsx: 'automatic',
      treeShaking: true,
    }
  };
});
