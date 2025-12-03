import { defineConfig, mergeConfig } from 'vite';
import { baseViteConfig } from './vite.config.base';
import { pwaViteConfig } from './vitePWA.config';
import { sentryViteConfig } from './viteSentry.config';

const stageViteConfig = {
	build: {
		outDir: 'dist',
		emptyOutDir: true,
		assetsDir: 'assets/stage',
		sourcemap: true,
		rollupOptions: {
			input: 'index.html',
		},
	},
};

export default defineConfig((env) =>
	mergeConfig(
		mergeConfig(stageViteConfig, baseViteConfig(env)),
		mergeConfig(sentryViteConfig(env), pwaViteConfig(env)),
	),
);
