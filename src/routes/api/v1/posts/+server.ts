import type { Post } from "$lib/types";
import { json, type RequestHandler } from "@sveltejs/kit";

const getPosts = async() => {
  let posts: Post[] = [];

  const paths = import.meta.glob('/src/posts/*.svx', {eager: true})

  for (const path in paths) {
    const file = paths[path]
    const slug = path.split('/').at(-1)?.replace('.svx', '')
    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      const metadata = file.metadata as Omit<Post, 'slug'>
      const post = {...metadata, slug} satisfies Post
      post.published && posts.push(post)
    }
  }

  posts.sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime())

  console.log(new Date(posts[1].date).getTime())

  return posts
}

export const GET: RequestHandler = async () => {
  const posts = await getPosts();
  return json(posts);
};