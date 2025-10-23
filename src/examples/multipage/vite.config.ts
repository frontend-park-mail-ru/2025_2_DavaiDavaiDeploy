import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [tsconfigPaths()],
	esbuild: {
		jsx: 'automatic',
		// jsxInject: "import {jsx, Fragment} from '@lib/jsx'",
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
