import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		bail: 1,
		cache: false,
		clearMocks: true,
		globals: true,
		setupFiles: ['./setup.tests.ts'],
	},
});
