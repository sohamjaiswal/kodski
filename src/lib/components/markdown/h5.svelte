<script lang="ts">
  import type {HTMLAttributes} from 'svelte/elements';
  interface $$Props extends HTMLAttributes<HTMLHeadingElement> {}
</script>

<h5 {...$$restProps} class={`text-3xl text-inherit ${$$restProps.class}`}>
  <slot />
</h5>
