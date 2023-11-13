<script lang='ts'>
	import type { HTMLAttributes } from "svelte/elements";
  interface $$Props extends HTMLAttributes<HTMLImageElement> {
    alt: string;
    src: string;
  }
  export let alt = "";
  export let src = "";
</script>

<img {...$$restProps} {src} {alt} loading="lazy">