import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import dynamicImport from 'vite-plugin-dynamic-import'
import { purgeCss } from 'vite-plugin-tailwind-purgecss';

export default defineConfig({
	plugins: [dynamicImport(), sveltekit(), purgeCss({
		safelist: {
			// any selectors that begin with "hljs-" will not be purged
			greedy: [/^hljs-/],
		},
	})],
	ssr: {
		noExternal: ['three', 'troika-three-text']
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
