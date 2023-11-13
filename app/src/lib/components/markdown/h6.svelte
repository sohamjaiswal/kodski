<script lang="ts">
  import type {HTMLAttributes} from 'svelte/elements';
  interface $$Props extends HTMLAttributes<HTMLHeadingElement> {}
</script>

<h6 {...$$restProps} class={`text-2xl text-inherit ${$$restProps.class}`}>
  <slot />
</h6>
