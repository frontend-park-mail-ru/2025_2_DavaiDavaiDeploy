import {defineConfig} from 'vite';
import {resolve} from 'path';

export default defineConfig({
  test: {
    include: ['**/__tests__/**/*.test.js'],
    reporters: 'verbose',
    environment: 'jsdom',
    testTimeout: 2000,
    coverage: {
      provider: 'v8',
    },
  },
});
