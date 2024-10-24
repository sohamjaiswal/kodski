import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	let theme = '';

	const cookieTheme = event.cookies.get('theme');
	if (
		cookieTheme &&
		cookieTheme != '' &&
		[
			'skeleton',
			'wintry',
			'modern',
			'rocket',
			'seafoam',
			'vintage',
			'sahara',
			'hamlindigo',
			'gold-nouveau',
			'crimson'
		].includes(cookieTheme)
	) {
		theme = cookieTheme;
	} else {
		event.cookies.set('theme', 'skeleton', {
			path: '/'
		});
		theme = 'skeleton';
	}

	return await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
	});
};
