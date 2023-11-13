<script lang="ts">
  import type {HTMLAttributes} from 'svelte/elements';
  interface $$Props extends HTMLAttributes<HTMLHeadingElement> {}
</script>

<h4 {...$$restProps} class={`text-4xl text-inherit ${$$restProps.class}`}>
  <slot />
</h4>
