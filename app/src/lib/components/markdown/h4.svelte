<script lang="ts">
  import type {HTMLAttributes} from 'svelte/elements';
  interface $$Props extends HTMLAttributes<HTMLHeadingElement> {}
</script>

<h4 {...$$restProps} class={`h4 text-inherit ${$$restProps.class}`}>
  <slot />
</h4>
