<script lang='ts'>
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
    <h1 class="text-8xl">{data.meta.title}</h1>
    <p>Published at {(new Date(data.meta.date)).toLocaleDateString()}</p>
  </hgroup>
  <div class="flex gap-1">
    {#each data.meta.categories as category} 
      <span class="badge variant-filled">{'#' + category}</span>
    {/each}
  </div>
  <hr class='my-2' />
  <div class="prose text-inherit">
    <svelte:component this={data.content} />
  </div>
</article>

<style lang="postcss">
  hgroup {
    margin-bottom: 16px;
  }

  .prose p:not(:is(h2, h3, h4, h5, h6) + p) {
    margin-top: 28px;
  }

  .prose :is(ul, ol) li {
    margin-block: 8px;
    padding-inline-start: 8px;
  }

  .prose pre {
    max-inline-size: 100%;
    padding: 12px;
    border-radius: 8px;
    tab-size: 2;
  }
</style>