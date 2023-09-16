<script lang='ts'>
	import type { HTMLAttributes } from "svelte/elements";
  interface $$Props extends HTMLAttributes<HTMLElement> {}
</script>

<strong {...$$restProps} class={`font-bold text-inherit ${$$restProps.class}`}>
  <slot />
</strong>