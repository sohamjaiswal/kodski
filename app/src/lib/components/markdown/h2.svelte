<script lang="ts">
  import type {HTMLAttributes} from 'svelte/elements';
  interface $$Props extends HTMLAttributes<HTMLHeadingElement> {}
</script>
<h2 {...$$restProps} class={`h2 text-inherit ${$$restProps.class}`}>
  <slot />
</h2>