<script lang="ts">
  import { Canvas } from '@threlte/core'
	import Scene from './Model.svelte';
  import type {HTMLAttributes} from 'svelte/elements';
  
  interface $$Props extends HTMLAttributes<HTMLDivElement> {
    model: string;
    clickModel?: string;
    hoverModel?: string;
  }
  
  export let model =  'https://threejsfundamentals.org/threejs/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf';
  export let clickModel = '';
  export let hoverModel = '';

  let activeModel = model;
  let isMouseOver = false;

  const resetModel = () => {
    if (isMouseOver && hoverModel) {
      activeModel = hoverModel;
    } else {
      activeModel = model;
    }
  }

  const handleMouseLeave = () => {
    isMouseOver = false;
    resetModel();
  }

  const handleMouseEnter = () => {
    isMouseOver = true;
    if (hoverModel) {
      activeModel = hoverModel;
    }
  }

  const handleMouseDown = () => {
    if (clickModel) {
      activeModel = clickModel;
    }
  }

  const handleMouseUp = () => {
    resetModel();
  }

</script>

<div {...$$restProps} class={`${$$restProps.class} scene`} on:mouseenter={handleMouseEnter} on:mousedown={handleMouseDown} on:mouseup={handleMouseUp} on:mouseleave={handleMouseLeave}>
  <Canvas>
    <Scene model={activeModel} />
  </Canvas>
</div>

<style lang="postcss">
  .scene {
    aspect-ratio: 1;
  }
</style>