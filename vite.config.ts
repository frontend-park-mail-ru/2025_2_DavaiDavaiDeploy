import { sentryVitePlugin } from '@sentry/vite-plugin';
import type { ConfigEnv } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }: ConfigEnv) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig({
		plugins: [
			tsconfigPaths(),
			VitePWA({
				registerType: 'autoUpdate',
				includeAssets: [
					'assets/favicon-16x16.png',
					'assets/favicon-32x32.png',
					'assets/apple-touch-icon.png',
					'assets/logo.svg',
				],
				manifest: {
					name: 'DDFilms - Онлайн кинотеатр',
					short_name: 'DDFilms',
					description: 'Смотрите фильмы и сериалы онлайн',
					theme_color: '#1976d2',
					background_color: '#ffffff',
					display: 'standalone',
					start_url: '/',
					icons: [
						{
							src: '/assets/favicon-16x16.png',
							sizes: '16x16',
							type: 'image/png',
						},
						{
							src: '/assets/favicon-32x32.png',
							sizes: '32x32',
							type: 'image/png',
						},
						{
							src: '/assets/apple-touch-icon.png',
							sizes: '180x180',
							type: 'image/png',
						},
						{
							src: '/assets/logo.svg',
							sizes: '512x512',
							type: 'image/svg+xml',
							purpose: 'any maskable',
						},
					],
				},
				workbox: {
					globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2,ttf,eot}'],
					runtimeCaching: [
						{
							urlPattern: /^https:\/\/cdn\.ddfilms-static\.ru\/.*/i,
							handler: 'CacheFirst',
							options: {
								cacheName: 'cdn-cache',
								expiration: {
									maxEntries: 100,
									maxAgeSeconds: 60 * 60,
								},
								cacheableResponse: {
									statuses: [0, 200],
								},
							},
						},
						{
							urlPattern: /^https:\/\/ddfilms\.online\/api\/.*/i,
							handler: 'NetworkFirst',
							options: {
								cacheName: 'api-cache',
								expiration: {
									maxEntries: 50,
									maxAgeSeconds: 60 * 5,
								},
								cacheableResponse: {
									statuses: [0, 200],
								},
							},
						},
					],
				},
				devOptions: {
					enabled: true,
				},
			}),
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
