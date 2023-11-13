import { json } from '@sveltejs/kit';

export const POST = async ({ cookies, request }) => {
  const formData = await request.formData();
  const theme = formData.get('theme')?.toString() ?? 'skeleton';
  // Sets the selected theme to the cookie
  cookies.set('theme', theme, { path: '/' });
  return json({ theme });
}