import { sentryVitePlugin } from '@sentry/vite-plugin';
import type { ConfigEnv } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
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
					{
						src: 'src/assets/screenshots/',
						dest: './assets',
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
			VitePWA({
				includeAssets: ['assets/favicon-86x86.png'],
				outDir: 'dist/assets',
				manifestFilename: 'assets/manifest.webmanifest',
				injectRegister: false,
				manifest: {
					name: 'DDFilms - Онлайн кинотеатр',
					short_name: 'DDFilms',
					description: 'Смотрите фильмы и сериалы онлайн',
					theme_color: '#1976d2',
					background_color: '#ffffff',
					display: 'standalone',
					start_url: 'https://ddfilms.online/',
					scope: 'https://ddfilms.online/',
					icons: [
						{
							src: '/assets/favicon-86x86.png',
							sizes: '86x86',
							type: 'image/png',
							purpose: 'maskable',
						},
					],
					screenshots: [
						{
							src: '/assets/screenshots/screenshot-narrow.png',
							type: 'image/png',
							sizes: '320x694',
							form_factor: 'narrow',
						},
						{
							src: '/assets/screenshots/screenshot-wide.png',
							type: 'image/png',
							sizes: '1899x1027',
							form_factor: 'wide',
						},
					],
				},

				devOptions: {
					enabled: true,
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
		},
		base: process.env.VITE_CDN_ADDRESS || '/',
	});
};
