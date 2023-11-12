import type { Contributions } from "$lib/types"
import type { PageLoad } from "./$types"

export const load: PageLoad = async({fetch}) => {
  const contributions = await (await fetch("/api/v1/ghStats/sohamjaiswal")).json() as Contributions
  try {
    const landingMd = await import("../posts/landing.svx")
    return {
      content: landingMd.default,
      contributions
    }
  } catch (e) {
    console.log("An error ocurred")
  }
  return {
    contributions
  }
} 