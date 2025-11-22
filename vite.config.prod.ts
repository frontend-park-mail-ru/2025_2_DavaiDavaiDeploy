import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig, mergeConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { baseViteConfig } from './vite.config.base';

export const prodViteConfig = defineConfig({
	plugins: [
		sentryVitePlugin({
			org: process.env.VITE_SENTRY_ORG,
			project: process.env.VITE_SENTRY_PROJECT,
			authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
			release: { name: process.env.VITE_RELEASE_VERSION },
		}),
		VitePWA({
			includeAssets: ['assets/favicon-86x86.png'],
			outDir: 'dist/assets',
			manifestFilename: 'assets/prod/manifest.webmanifest',
			injectRegister: false,
			manifest: {
				name: 'DDFilms - Онлайн кинотеатр',
				short_name: 'DDFilms',
				description: 'Смотрите фильмы и сериалы онлайн',
				theme_color: '#1976d2',
				background_color: '#ffffff',
				display: 'standalone',
				start_url: process.env.VITE_PRODUCTION_URL,
				scope: process.env.VITE_PRODUCTION_URL,
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
	build: {
		outDir: 'dist',
		emptyOutDir: true,
		assetsDir: 'assets/prod',
		sourcemap: true,
		rollupOptions: {
			input: 'index.html',
		},
	},
});

export default mergeConfig(prodViteConfig, baseViteConfig);
