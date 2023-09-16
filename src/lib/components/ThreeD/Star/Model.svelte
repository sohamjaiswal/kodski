<script>
  import {Group} from 'three'
  import {T, useFrame} from '@threlte/core'
  import { OrbitControls, useGltf } from '@threlte/extras'

  export const ref = new Group()
  let rotation = 0
  let dn = Date.now()
  useFrame((state, delta) => {
    rotation += delta
    dn = Date.now()
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 3, 0]}
>
  <OrbitControls
    autoRotate
    autoRotateSpeed={0}
    enableDamping
    enableZoom={false}
  />
</T.PerspectiveCamera>
<T.DirectionalLight position={[10, 10, 10]} castShadow />
<T.DirectionalLight position={[-10, -10, -10]} castShadow />
{#await useGltf('/models/kasumiCharm2.glb') then gltf}
  <T is={gltf.scene} rotation.z={rotation/1.35} position.z={(Math.sin(dn/1000))/10} />
{/await}
