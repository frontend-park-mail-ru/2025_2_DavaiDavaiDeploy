import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export const pwaViteConfig = defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const manifestPath =
		mode === 'stage'
			? 'assets/stage/manifest.webmanifest'
			: 'assets/prod/manifest.webmanifest';

	return {
		plugins: [
			VitePWA({
				includeAssets: ['assets/favicon-86x86.png'],
				outDir: 'dist/assets',
				manifestFilename: manifestPath,
				injectRegister: false,
				manifest: {
					name: 'DDFilms - Онлайн кинотеатр',
					short_name: 'DDFilms',
					description: 'Смотрите фильмы и сериалы онлайн',
					theme_color: '#1976d2',
					background_color: '#ffffff',
					display: 'standalone',
					start_url: env.VITE_PRODUCTION_URL,
					scope: env.VITE_PRODUCTION_URL,
					icons: [
						{
							src: `${env.VITE_CDN_ADDRESS}/static/favicon/apple-touch-icon-180x180.png`,
							sizes: '180x180',
							type: 'image/png',
						},
						{
							src: `${env.VITE_CDN_ADDRESS}/static/favicon/apple-touch-icon-167x167.png`,
							sizes: '167x167',
							type: 'image/png',
						},
						{
							src: `${env.VITE_CDN_ADDRESS}/static/favicon/apple-touch-icon-152x152.png`,
							sizes: '152x152',
							type: 'image/png',
						},
						{
							src: `${env.VITE_CDN_ADDRESS}/static/favicon/apple-touch-icon-120x120.png`,
							sizes: '120x120',
							type: 'image/png',
						},
						{
							src: `${env.VITE_CDN_ADDRESS}/static/favicon/favicon-512x512.png`,
							sizes: '512x512',
							type: 'image/png',
						},
						{
							src: `${env.VITE_CDN_ADDRESS}/static/favicon/favicon-144x144.png`,
							sizes: '144x144',
							type: 'image/png',
						},
						{
							src: `${env.VITE_CDN_ADDRESS}/static/favicon/favicon-86x86.png`,
							sizes: '86x86',
							type: 'image/png',
						},
						{
							src: `${env.VITE_CDN_ADDRESS}/static/favicon/favicon-32x32.png`,
							sizes: '32x32',
							type: 'image/png',
						},
					],
					screenshots: [
						{
							src: `${env.VITE_CDN_ADDRESS}/static/screenshots/screenshot-narrow.png`,
							type: 'image/png',
							sizes: '538x819',
							form_factor: 'narrow',
						},
						{
							src: `${env.VITE_CDN_ADDRESS}/static/screenshots/screenshot-wide.png`,
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
	};
});
