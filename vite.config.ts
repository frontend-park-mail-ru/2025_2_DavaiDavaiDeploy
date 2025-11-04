import { sentryVitePlugin } from '@sentry/vite-plugin';
import type { ConfigEnv } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }: ConfigEnv) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig({
		plugins: [
			tsconfigPaths(),
			viteStaticCopy({
				targets: [
					{
						src: 'src/sw.js',
						dest: './',
					},
				],
			}),
			sentryVitePlugin({
				org: process.env.VITE_SENTRY_ORG,
				project: process.env.VITE_SENTRY_PROJECT,
				authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
				release: { name: process.env.VITE_RELEASE_VERSION },
			}),
			svgr({
				svgrOptions: {
					plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
					jsxRuntimeImport: {
						namespace: 'jsx',
						source: '@robocotik/react/jsx-runtime',
					},
					jsxRuntime: 'automatic',
					svgoConfig: {
						floatPrecision: 2,
					},
				},
				esbuildOptions: {
					jsx: 'transform',
					jsxFactory: 'jsx.jsx',
					jsxFragment: 'Fragment',
					jsxDev: false,
				},
			}),
		],
		esbuild: {
			jsx: 'transform',
			jsxFactory: 'jsx',
			jsxFragment: 'Fragment',
			jsxInject: "import {jsx, Fragment} from '@robocotik/react/jsx-runtime'",
			jsxDev: false,
		},
		server: {
			host: 'localhost',
			port: 3000,
			proxy: {
				'/api': {
					target: 'https://ddfilms.online/api/',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ''),
				},
			},
		},
		build: {
			outDir: 'dist',
			emptyOutDir: true,
			assetsDir: 'assets',
			sourcemap: true,
			rollupOptions: {
				output: {
					entryFileNames: 'assets/[name].js',
					chunkFileNames: 'assets/[name].js',
					assetFileNames: 'assets/[name].[ext]',
				},
			},
		},
		base: process.env.VITE_CDN_ADDRESS || '/',
	});
};
