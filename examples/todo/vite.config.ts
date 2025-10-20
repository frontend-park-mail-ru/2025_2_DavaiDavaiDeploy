import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'jsx',
    jsxFragment: 'Fragment',
    jsxInject: "import {jsx, Fragment} from '@lib/react'",
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
