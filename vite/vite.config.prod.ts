import { defineConfig, mergeConfig } from 'vite';
import { baseViteConfig } from './vite.config.base';
import { pwaViteConfig } from './vitePWA.config';
import { sentryViteConfig } from './viteSentry.config';

const prodViteConfig = {
	build: {
		outDir: 'dist',
		emptyOutDir: true,
		assetsDir: 'assets/prod',
		sourcemap: true,
		rollupOptions: {
			input: 'index.html',
		},
	},
};

export default defineConfig((env) =>
	mergeConfig(
		mergeConfig(prodViteConfig, baseViteConfig(env)),
		mergeConfig(pwaViteConfig(env), sentryViteConfig(env)),
	),
);
