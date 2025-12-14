import { defineConfig, loadEnv } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export const baseViteConfig = defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [
			tsconfigPaths(),
			viteStaticCopy({
				targets: [
					{
						src: 'src/sw.js',
						dest: './',
					},
					{
						src: './robots.txt',
						dest: './',
					},
				],
			}),
			svgr({
				svgrOptions: {
					plugins: ['@svgr/plugin-jsx'],
					jsxRuntimeImport: {
						namespace: 'jsx',
						source: '@robocotik/react/jsx-runtime',
					},
					jsxRuntime: 'automatic',
				},
				esbuildOptions: {
					jsx: 'transform',
					jsxFactory: 'jsx.jsx',
					jsxFragment: 'Fragment',
					jsxDev: false,
				},
			}),
		],
		resolve: {
			alias: {
				'@': '/src',
			},
		},
		esbuild: {
			jsx: 'transform',
			jsxFactory: 'jsx',
			jsxFragment: 'Fragment',
			jsxInject: "import {jsx, Fragment} from '@robocotik/react/jsx-runtime'",
			jsxDev: false,
		},
		server: {
			host: 'localhost',
			port: 80,
			proxy: {
				'/api': {
					target: env.VITE_PRODUCTION_API_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ''),
					ws: true,
				},
			},
		},
		base: env.VITE_CDN_ADDRESS || '/',
	};
});
