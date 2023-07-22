<script lang="ts">
	import type { Categories, Post } from "$lib/types";

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface $$Props extends Post {}

  export let title = ''
  export let description = ''
  export let slug = ''
  export let date = ''
  export let categories: Categories[] = []
  export let published = true

</script>

<a href={`blog/${slug}`}>
  <div
    class="rounded-md bg-opacity-0 w-80 h-52 p-4 post-tile card"
    data-slug={slug}
  >
    {#if published}
    <header>
      <div class="flex gap-4">
        <h1>
          {title}
        </h1>
        <div class="flex gap-1">
          {#each categories as category} 
            <span class="badge variant-filled">{'#' + category}</span>
          {/each}
        </div>
      </div>
      <hr class="my-2" />
    </header>
    <main class="h-24">
      {description}
    </main>
    <footer>
      <hr class="my-2" />
      {(new Date(date)).toLocaleDateString()}
    </footer>
    {/if}
  </div>
</a>

<style lang="postcss">
  .card {
    box-shadow: none;
  }
</style>