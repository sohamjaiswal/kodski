<script lang="ts">
  import type {HTMLAttributes} from 'svelte/elements';
  interface $$Props extends HTMLAttributes<HTMLHeadingElement> {}
</script>

<h5 {...$$restProps} class={`h5 text-inherit ${$$restProps.class}`}>
  <slot />
</h5>
