<script lang="ts">
  export let data
</script>
<main class="prose text-inherit mb-2">
  <svelte:component this={data.content} />
</main>