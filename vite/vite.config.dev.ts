import { defineConfig, mergeConfig } from 'vite';
import { baseViteConfig } from './vite.config.base';
import { sentryViteConfig } from './viteSentry.config';

const devViteConfig = defineConfig({
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

export default mergeConfig(
	mergeConfig(devViteConfig, baseViteConfig),
	sentryViteConfig,
);
