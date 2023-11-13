<script lang="ts">
  import type {HTMLAttributes} from 'svelte/elements';
  interface $$Props extends HTMLAttributes<HTMLHeadingElement> {}
</script>
<h1 {...$$restProps} class={`h1 text-inherit ${$$restProps.class}`}>
  <slot />
</h1>