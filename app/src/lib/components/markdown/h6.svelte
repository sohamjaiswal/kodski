<script lang="ts">
  import type {HTMLAttributes} from 'svelte/elements';
  interface $$Props extends HTMLAttributes<HTMLHeadingElement> {}
</script>

<h6 {...$$restProps} class={`h6 text-inherit ${$$restProps.class}`}>
  <slot />
</h6>
