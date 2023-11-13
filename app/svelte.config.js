var __assign = (this && this.__assign) || function () {
	__assign = Object.assign || function(t) {
			for (var s, i = 1, n = arguments.length; i < n; i++) {
					s = arguments[i];
					for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
							t[p] = s[p];
			}
			return t;
	};
	return __assign.apply(this, arguments);
};

// import adapter from '@sveltejs/adapter-auto';
import adapter from 'svelte-adapter-bun'
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkToc from 'remark-toc';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkEmoji from 'remark-emoji';
import rehypeFormat from 'rehype-format';
import rehypeAccessibleEmojis from 'rehype-accessible-emojis';
import rehypeKatex from 'rehype-katex';
import Slugger from 'github-slugger';
import { hasProperty } from 'hast-util-has-property';
import { toString } from 'hast-util-to-string';
import { visit } from 'unist-util-visit';
import { h } from "hastscript";
import { findAndReplace } from "hast-util-find-and-replace";
import { shikiTwoslashHighlighter } from '@kitbook/mdsvex-shiki-twoslash';

var defaultOptions = {
	emojis: {},
	className: "emoji",
	ignore: "code",
	alt: true,
};

function objectToHtml(obj) {
  const { type, tagName, properties, children } = obj;

  const attributes = Object.entries(properties)
    .map(([key, value]) => {
      if (key === 'className') {
        return `class="${value.join(' ')}"`;
      }
      return `${key}="${value}"`;
    })
    .join(' ');

  // const childrenHtml = children.map(child => objectToHtml(child)).join('');

  return `<${tagName} ${attributes} />`;
}

var rehypeCustomEmoji = function (options) {
	var opts = __assign(__assign({}, defaultOptions), options);
	var replace_maps = {};
	Object.entries(opts.emojis).forEach(function (_a) {
			var emoji_code = _a[0], path = _a[1];
			var emoji = ":".concat(emoji_code, ":");
			var commonProperties = {
					src: path,
					className: opts.className,
					alt: opts.alt ? emoji : undefined,
			};
			var inlineProperties = {...commonProperties, style: "display: inline; aspect-ratio: 1; width: 1.75em; margin: 0"};
			replace_maps["\n".concat(emoji)] = h("img", commonProperties);
			replace_maps[emoji] = h("img", inlineProperties);
	});
	return function (tree) {
			visit(tree, ["raw", "element", "text"], function (node) {
				switch (node.type) {
					case "raw":
						// replace emoji strings taking values from replace_maps
						node.value = node.value.replace(/(:[a-zA-Z0-9_+-]+:|\n:[a-zA-Z0-9_+-]+:)/g, function (match) {
							// return replace_maps[match] || match;
							if (replace_maps[match]) {
								return objectToHtml(replace_maps[match])
							}
							return match
						});
						break
					case "element":
						var _a;
						if (((_a = node.properties) === null || _a === void 0 ? void 0 : _a.dataEmoji) === undefined && node.tagName !== "p" && node.tagName !== "span") {
							return;
						}
						findAndReplace(node, replace_maps, { ignore: opts.ignore });
						break
					case "text":
						break
				}
			});
	};
};

const slugs = new Slugger();

const headingRank = (node) => {
	const name = (node && node.type === 'element' && node.tagName.toLowerCase()) || '';
	const code =
		name.length === 2 && name.charCodeAt(0) === 104 /* `h` */
			? name.charCodeAt(1)
			: name.length === 13 && name.charCodeAt(11) === 104 /* Components.h (h at 11th pos) */
			? name.charCodeAt(12)
			: 0;
	return code > 48 /* `0` */ && code < 55 /* `7` */ ? code - 48 /* `0` */ : null;
};
const rehypeSlug = (options) => {
	const prefix = options?.prefix || '';

	return (tree) => {
		slugs.reset();

		visit(tree, 'element', (node) => {
			if (headingRank(node) && node.properties && !hasProperty(node, 'id')) {
				node.properties.id = prefix + slugs.slug(toString(node));
			}
		});
	};
};
/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extension: '.svx',
	layout: {
		_: './src/mdsvex.svelte'
	},
	highlight: shikiTwoslashHighlighter({themes: ['monokai', 'material-lighter']}),
	// remarkgfm, remarkmath, rehypekatex not working
	remarkPlugins: [remarkGfm, remarkMath, remarkUnwrapImages, remarkEmoji, remarkToc],
	rehypePlugins: [
		rehypeSlug,
		rehypeKatex,
		[rehypeCustomEmoji, {
			emojis: {
				earperk: '/emojis/earperk.gif',
				gigachad: '/emojis/gigachad.gif',
				aqualove: '/emojis/aqualove.png',
				zerotwo_hype: '/emojis/zerotwo_hype.gif',
			},
			className: 'custom-emoji'
		}],
		rehypeAccessibleEmojis,
		rehypeFormat
	]
};

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
