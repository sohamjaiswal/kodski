<script lang="ts">
  import type {HTMLAttributes} from 'svelte/elements';
  interface $$Props extends HTMLAttributes<HTMLHeadingElement> {}
</script>
<a href={$$restProps.href} {...$$restProps} class={`text-inherit ${$$restProps.class}`}>
  <slot />
</a>