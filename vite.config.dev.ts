import { defineConfig, mergeConfig } from 'vite';
import { baseViteConfig } from './vite.config.base';

export const devViteConfig = defineConfig({
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

export default mergeConfig(devViteConfig, baseViteConfig);
