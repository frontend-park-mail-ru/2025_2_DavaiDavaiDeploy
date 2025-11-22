import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig, loadEnv } from 'vite';

function getPlugins(env: Record<string, string>) {
	const isSentryEnabled = env.VITE_SENTRY_ENABLED === 'true';

	if (!isSentryEnabled) {
		return [];
	}

	return [
		sentryVitePlugin({
			org: env.VITE_SENTRY_ORG,
			project: env.VITE_SENTRY_PROJECT,
			authToken: env.VITE_SENTRY_AUTH_TOKEN,
			release: { name: env.VITE_RELEASE_VERSION },
		}),
	];
}

export const sentryViteConfig = defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		plugins: getPlugins(env),
	};
});
