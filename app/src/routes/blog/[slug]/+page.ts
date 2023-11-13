import type { Post } from "$lib/types.js";
import { error } from "@sveltejs/kit";

export const load = async({params}) => {
  try {
    const post = await import(`../../../posts/${params.slug}.svx`)
    return {
      content: post.default,
      meta: post.metadata as Omit<Post, 'slug'>
    }
  } catch (e) {
    throw error(404, `Could not find post with slug, ${params.slug}`)
  }
}