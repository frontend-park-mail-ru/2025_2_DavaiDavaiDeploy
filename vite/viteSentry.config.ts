import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';

const isSentryEnabled = process.env.VITE_SENTRY_ENABLED === 'true';

export const sentryViteConfig = defineConfig({
	plugins: isSentryEnabled
		? [
				sentryVitePlugin({
					org: process.env.VITE_SENTRY_ORG,
					project: process.env.VITE_SENTRY_PROJECT,
					authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
					release: { name: process.env.VITE_RELEASE_VERSION },
				}),
			]
		: [],
});
