import {defineConfig} from 'vite';
import {resolve} from 'path';

export default defineConfig({
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'jsx',
    jsxFragment: 'Fragment',
    jsxInject: "import {jsx, Fragment} from '@lib/react.js'",
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@lib': resolve(__dirname, '../../lib/dist'),
      '@src': resolve(__dirname, 'src'),
    },
  },
});
