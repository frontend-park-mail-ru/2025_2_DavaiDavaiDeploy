import { defineConfig, mergeConfig } from 'vite';
import { baseViteConfig } from './vite.config.base';
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
		sentryViteConfig(env),
	),
);
