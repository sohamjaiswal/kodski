import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import dynamicImport from 'vite-plugin-dynamic-import'

export default defineConfig({
	plugins: [dynamicImport(), sveltekit()],
	ssr: {
		noExternal: ['three', 'troika-three-text']
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
