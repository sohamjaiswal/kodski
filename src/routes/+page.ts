import type { PageLoad } from "./$types"

export const load: PageLoad = async() => {
  try {
    const landingMd = await import("../posts/landing.svx")
    return {
      content: landingMd.default,
    }
  } catch (e) {
    console.log("An error ocurred")
  }
} 