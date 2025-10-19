import {defineConfig} from 'vite';
import {resolve} from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
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
      '@types': resolve(__dirname, '../../lib/src/types'),
      '@utils': resolve(__dirname, '../../lib/src/utils'),
      '@src': resolve(__dirname, 'src'),
    },
  },
});
