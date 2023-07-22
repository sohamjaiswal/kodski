<script lang='ts'>
  import * as Threlte from '@threlte/core';
  import * as Three from 'three';
  import * as Utils from 'three/src/math/MathUtils'
</script>

<div class="scene">
  <Threlte.Canvas>
    <Threlte.PerspectiveCamera position={{x: 20, y: 20, z: 20}}>
      <Threlte.OrbitControls />
    </Threlte.PerspectiveCamera>
    <Threlte.AmbientLight intensity={0.2} />
    <Threlte.DirectionalLight intensity={2} position={{x: 10, y: 20}} shadow={{camera: { top: 8 }}} />
    <Threlte.Mesh 
      geometry={new Three.SphereGeometry(4,64,64)} 
      material={new Three.MeshStandardMaterial({color: 'white'})} 
      position={{x: 0, y: 4.25, z: 0}}
      receiveShadow
      castShadow
    />
    <Threlte.Mesh geometry={new Three.BoxGeometry(20, 0.5, 20)} 
      material={new Three.MeshStandardMaterial({
        color: 'white',
      })}
      receiveShadow
    />
  </Threlte.Canvas>
</div>

<style lang='postcss'>
  .scene {
    width: 100%;
    aspect-ratio: 1;
    inset: 0;
    /* background: radial-gradient(#363636, #0d0d0d); */
  }
</style>