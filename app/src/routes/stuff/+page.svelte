<script lang="ts">
  export let data
</script>
<main class="prose text-inherit">
  <svelte:component this={data.content} />
</main>