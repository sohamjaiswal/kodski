<script lang="ts">
  import type {HTMLAttributes} from 'svelte/elements';
  interface $$Props extends HTMLAttributes<HTMLHeadingElement> {}
</script>
<h3 {...$$restProps} class={`text-5xl mt-2 mb-2 text-inherit ${$$restProps.class}`}>
  <slot />
</h3>
<hr class="mb-2" />
