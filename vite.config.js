import {defineConfig} from 'vite';
import {resolve} from 'path';

export default defineConfig({
  root: 'examples/counter/',
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
      '@src': resolve(__dirname, 'src'),
      '@utils': resolve(__dirname, 'src/utils'),
    },
  },
});
