import { sentryVitePlugin } from '@sentry/vite-plugin';
import type { ConfigEnv } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }: ConfigEnv) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	// import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
	// import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

	return defineConfig({
		plugins: [
			tsconfigPaths(),
			sentryVitePlugin({
				org: process.env.SENTRY_ORG,
				project: process.env.SENTRY_PROJECT,

				// Auth tokens can be obtained from https://sentry.io/orgredirect/organizations/:orgslug/settings/auth-tokens/
				authToken: process.env.SENTRY_AUTH_TOKEN,
			}),
		],
		server: {
			host: 'localhost',
			port: 3000,
		},
		build: {
			outDir: 'dist',
			emptyOutDir: true,
			assetsDir: 'assets',
			sourcemap: true,
		},
	});
};
