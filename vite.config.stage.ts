import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig, mergeConfig } from 'vite';
import { baseViteConfig } from './vite.config.base';

export const stageViteConfig = defineConfig({
	plugins: [
		sentryVitePlugin({
			org: process.env.VITE_SENTRY_ORG,
			project: process.env.VITE_SENTRY_PROJECT,
			authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
			release: { name: process.env.VITE_RELEASE_VERSION },
		}),
	],
	build: {
		outDir: 'dist',
		emptyOutDir: true,
		assetsDir: 'assets/stage',
		sourcemap: true,
		rollupOptions: {
			input: 'index.html',
		},
	},
});

export default mergeConfig(stageViteConfig, baseViteConfig);
