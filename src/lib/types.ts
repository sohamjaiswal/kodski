export type Categories = 'SvelteKit' | 'Svelte'

export type Post = {
  title: string,
  description: string,
  slug: string,
  date: string,
  categories: Categories[],
  published: boolean,
  readingTime?: string
}

export type Contributions = Array<{
  count: number,
  day: string,
  dat: string,
  level: number
} | null>[]