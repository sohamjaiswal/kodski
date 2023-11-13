<script lang="ts">
  import type {HTMLAttributes} from 'svelte/elements';
  interface $$Props extends HTMLAttributes<HTMLHeadingElement> {}
</script>
<a {...$$restProps} class={`text-inherit ${$$restProps.class}`}>
  <slot />
</a>