import type { PageLoad } from "../$types";

export const load: PageLoad = async () => {
  try {
    const stuffMd = await import("../../posts/stuff.svx")
    return {
      content: stuffMd.default,
    }
  } catch (e) {
    console.log("An error ocurred")
  }
}