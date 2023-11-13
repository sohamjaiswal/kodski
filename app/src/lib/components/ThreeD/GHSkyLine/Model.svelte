<script lang="ts">
	import type { Contributions } from '$lib/types';
  import {tweened} from 'svelte/motion'
  import {quadInOut} from 'svelte/easing'
	import { onMount } from 'svelte';
	import { T } from '@threlte/core';
	import { Align, OrbitControls } from '@threlte/extras';
	import { modeCurrent } from '@skeletonlabs/skeleton';
	let contributions: Contributions = [];
  $: contributions = contributions
  const getColor: (level: number) => string = (level: number) => {
    switch (level) {
      default:
        return $modeCurrent ? "#f0f0f0" : "#0e0e0e";
      case 1:
        return "#00d35c";
      case 2:
        return "#00a648";
      case 3:
        return "#ffaa22";
      case 4:
        return "#ff442a";
    }
  };
  const normalize = (count: number, base = 4, offset = 2) => {
    switch (true) {
      case count === 0:
        return base
      case count > 40:
        return count
      default:
        return count * (base * offset)
    }
  }
  const scaleY = tweened(0, {duration: 2000, easing: quadInOut})
	onMount(async () => {
		contributions = await (await fetch('/api/v1/ghStats/sohamjaiswal')).json();
    $scaleY = 1
	});
</script>

<T.PerspectiveCamera makeDefault position={[50, 500, 500]} fov={90}>
	<OrbitControls enableDamping autoRotate />
</T.PerspectiveCamera>
<T.AmbientLight intensity={0.5} color="#fff" />
<T.DirectionalLight position={[0, 200, 200]} intensity={2} color="#fff" />
<T.DirectionalLight position={[0, 200, -200]} intensity={2} color="#fff" />
{#key [contributions, $modeCurrent]}
<Align autoAlign>
  {#each contributions as row, i}
    {#each row as day, j}
      {#if day}
        {@const color = getColor(day.level)}
        {@const y = normalize(day.count)}
        <T.Group position={[0, 0, 12 * i]} scale.y={$scaleY}>
          <T.Mesh position={[12 * j, y / 2, 0]}>
            <T.BoxGeometry args={[10, y, 10]} />
            <T.MeshStandardMaterial {color} />
          </T.Mesh>
        </T.Group>
      {/if}
    {/each}
  {/each}
</Align>
{/key}