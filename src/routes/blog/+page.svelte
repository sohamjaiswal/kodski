<script lang="ts">

  export let data

  import GlossyCards from '$lib/fragments/GlossyCards/GlossyCards.svelte';
	import type { IGlossyCards } from '$lib/fragments/GlossyCards/GlossyCards.types';
	import PostTile from '$lib/fragments/PostTile/PostTile.svelte';

  const transformCards = data.posts.map((post) => {
    return {
      component: PostTile,
      value: post
    }
  })

	const cards: IGlossyCards = {
		cards: transformCards,
		height: 208,
		width: 320
	};

</script>

<ol class="breadcrumb mb-2">
  <li class="crumb"><a class="anchor" href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li>Blog</li>
</ol>


<h1 class='text-7xl mb-4'>Blog</h1>

<GlossyCards {...cards} />