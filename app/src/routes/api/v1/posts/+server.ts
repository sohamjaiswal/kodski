import type { Post } from "$lib/types";
import { json, type RequestHandler } from "@sveltejs/kit";
import readingTime from "reading-time";

const getPosts = async() => {
  const posts: Post[] = [];
  const postsData = import.meta.glob(`/src/posts/*.svx`, {as: 'raw',eager: true})
  const paths = import.meta.glob('/src/posts/*.svx', {eager: true})
  const timeMap: Record<string, string> = {}
  for (const post in postsData) {
    const data = postsData[post]
    const metadataObj = paths[post]
    if (metadataObj && typeof metadataObj === 'object' && 'metadata' in metadataObj) {
      const metadata = metadataObj.metadata as Omit<Post, 'slug'>
      if (!metadata.published){
        continue
      }
      if (metadata.readingTime) {
        timeMap[post] = metadata.readingTime
        continue
      }
    }
    const readTime = readingTime(data)
    timeMap[post] = readTime.text
  }
  for (const path in paths) {
    const file = paths[path]
    const slug = path.split('/').at(-1)?.replace('.svx', '')
    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      const metadata = file.metadata as Omit<Post, 'slug'>
      const post = {...metadata, slug, readingTime: timeMap[path]} satisfies Post
      post.published && posts.push(post)
    }
  }
  posts.sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime())
  return posts
}

export const GET: RequestHandler = async () => {
  const posts = await getPosts();
  return json(posts);
};