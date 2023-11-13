<script lang='ts'>
  import { TableOfContents, tocCrawler } from '@skeletonlabs/skeleton';
  export let data
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
  <meta property="og:description" content={data.meta.description} />
</svelte:head>

<ol class="breadcrumb mb-2">
  <li class="crumb"><a class="anchor" href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a class="anchor" href="/blog">Blog</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li>{data.meta.title}</li>
</ol>

<article>
  <hgroup>
    <h1 class="h1 text-5xl mb-2">{data.meta.title}</h1>
    <p>Published at {(new Date(data.meta.date)).toLocaleDateString()}</p>
  </hgroup>
  <div class="flex gap-1">
    {#each data.meta.categories as category} 
      <span class="badge variant-filled">{'#' + category}</span>
    {/each}
  </div>
  <p class="mt-2 mb-3">
    {data.meta.description}
  </p>
  <hr class='my-2' />
  <div class="prose text-inherit mt-2" use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
    <TableOfContents class="card fixed top-1/2 -translate-y-1/2 right-10 p-4 text-inherit hidden md:block max-h-[300px] overflow-scroll overflow-x-hidden hide-scrollbar" />
    <svelte:component this={data.content} />
  </div>
</article>
