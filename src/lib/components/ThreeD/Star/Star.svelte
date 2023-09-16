<script>
  import { Canvas } from '@threlte/core'
	import Scene from './Model.svelte';
</script>

<div class="scene">
  <Canvas>
    <Scene />
  </Canvas>
</div>

<style lang="postcss">
  .scene {
    width: 100%;
    aspect-ratio: 1;
  }
</style>