<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
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
