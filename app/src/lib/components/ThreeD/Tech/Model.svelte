<script>
	import { Group } from 'three';
	import { T, useFrame } from '@threlte/core';
	import { OrbitControls, useGltf } from '@threlte/extras';
	import { interactivity } from '@threlte/extras';
	import { spring } from 'svelte/motion';

  export let model = '';

	interactivity();
	const scale = spring(1);
	export const ref = new Group();
	let rotation = 0;
	let dn = Date.now();
	useFrame((_, delta) => {
		rotation += delta;
		dn = Date.now();
	});
</script>

<T.PerspectiveCamera makeDefault position={[0, 10, 0]}>
	<OrbitControls autoRotate autoRotateSpeed={0} enableDamping enableZoom={false} />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.5} color="#fff" />
<T.DirectionalLight position={[0, 200, 200]} intensity={1.5} color="#fff" />
<T.DirectionalLight position={[0, 200, -200]} intensity={1.5} color="#fff" />
{#await useGltf(model) then gltf}
	<T
		is={gltf.scene}
		rotation.z={0.5 * Math.sin(rotation / 1.35)}
		position.z={Math.sin(dn / 1000) / 10}
		receiveShadow
		castShadow
		scale={$scale}
		on:pointerenter={() => scale.set(1.25)}
		on:pointerleave={() => scale.set(1)}
		aria-label="3D Model"
	/>
{/await}
