// import adapter from '@sveltejs/adapter-auto';
import adapter from 'svelte-adapter-bun';
import { vitePreprocess } from '@sveltejs/kit/vite';
import {escapeSvelte, mdsvex} from 'mdsvex'
import shiki from 'shiki'
import remarkUnwrapImages from 'remark-unwrap-images'
import remarkToc from 'remark-toc'
import rehypeAutoLinkHeadings from 'rehype-autolink-headings'

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extension: '.svx',
	layout: {
		_: './src/mdsvex.svelte'
	},
	highlight: {
		highlighter: async(code, lang= 'text') => {
			const highlighter = await shiki.getHighlighter({ theme: 'monokai' })
			const result = escapeSvelte(highlighter.codeToHtml(code, {lang}))
			return `{@html \`${result}\`}`
		}
	},
	remarkPlugins: [remarkUnwrapImages, remarkToc],
	rehypePlugins: [rehypeAutoLinkHeadings]
}

/** @type {import('@sveltejs/kit').Config} */
const config = {

	extensions: ['.svelte', '.svx'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

	vitePlugin: {
		inspector: true
	},
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			out: 'build',
			assets: true,
			precompress: {
				brotli: true,
				gzip: true
			}
		})
	}
};
export default config;
