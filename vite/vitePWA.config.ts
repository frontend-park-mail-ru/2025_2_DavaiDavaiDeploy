import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export const pwaViteConfig = defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		plugins: [
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
					start_url: env.VITE_PRODUCTION_URL,
					scope: env.VITE_PRODUCTION_URL,
					icons: [
						{
							src: `${env.VITE_CDN_ADDRESS}/assets/favicon/apple-touch-icon.png`,
							sizes: '180x180',
							type: 'image/png',
						},
						{
							src: `${env.VITE_CDN_ADDRESS}/assets/favicon/favicon-144x144.png`,
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
	};
});
