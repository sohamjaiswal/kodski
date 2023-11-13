<script lang="ts">
  import type {HTMLAttributes} from 'svelte/elements';
  interface $$Props extends HTMLAttributes<HTMLHeadingElement> {}
</script>
<h1 {...$$restProps} class={`text-7xl mt-5 mb-2 text-inherit ${$$restProps.class}`}>
  <slot />
</h1>
<hr class="mb-2" />