<script lang="ts">
  import type {HTMLAttributes} from 'svelte/elements';
  interface $$Props extends HTMLAttributes<HTMLHeadingElement> {}
</script>
<h2 {...$$restProps} class={`text-6xl mt-3 mb-2 text-inherit ${$$restProps.class}`}>
  <slot />
</h2>
<hr class="mb-2" />