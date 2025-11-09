import { sentryVitePlugin } from '@sentry/vite-plugin';
import type { ConfigEnv } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }: ConfigEnv) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	const isProduction = mode === 'production';
	const isSentryEnabled = process.env.VITE_SENTRY_ENABLED === 'true';
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
					{
						src: 'src/assets/favicon/',
						dest: './assets',
					},
					{
						src: './robots.txt',
						dest: './',
					},
				],
			}),
			isSentryEnabled
				? sentryVitePlugin({
						org: process.env.VITE_SENTRY_ORG,
						project: process.env.VITE_SENTRY_PROJECT,
						authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
						release: { name: process.env.VITE_RELEASE_VERSION },
					})
				: null,
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
					start_url: process.env.VITE_PRODUCTION_API_URL,
					scope: process.env.VITE_PRODUCTION_API_URL,
					icons: [
						{
							src: `${process.env.VITE_CDN_ADDRESS}/assets/favicon/apple-touch-icon.png`,
							sizes: '180x180',
							type: 'image/png',
						},
						{
							src: `${process.env.VITE_CDN_ADDRESS}/assets/favicon/favicon-144x144.png`,
							sizes: '144x144',
							type: 'image/png',
						},
					],
					screenshots: [
						{
							src: '/assets/screenshots/screenshot-narrow.png',
							type: 'image/png',
							sizes: '538x819',
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
					target: process.env.VITE_PRODUCTION_API_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ''),
				},
			},
		},
		build: {
			outDir: 'dist',
			emptyOutDir: true,
			assetsDir: isProduction ? 'assets/prod' : 'assets/stage',
			sourcemap: true,
			rollupOptions: {
				input: 'index.html',
			},
		},
		base: process.env.VITE_CDN_ADDRESS || '/',
	});
};
