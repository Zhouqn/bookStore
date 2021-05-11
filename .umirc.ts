import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://123.56.82.247/api/',
      changeOrigin: true,
      // 'pathRewrite': { '^/api' : '' },
    },
  },
});
