<script lang="ts">
  import {fade} from 'svelte/transition';

  export let url = ''
</script>

{#key url}
  <div class="transition" in:fade>
    <slot />
  </div>
{/key}

<style lang="postcss">
  .transition {
    height: 100%;
  }
</style>