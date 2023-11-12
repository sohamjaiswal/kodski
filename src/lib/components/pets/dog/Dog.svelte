<script lang="ts">
	import { onMount } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	const doges = ['akita', 'black', 'brown', 'red', 'white'];

	// take random doge
	const doge = doges[Math.floor(Math.random() * doges.length)];

	// get anim urls
	const animationMap = new Map<string, string>();
	animationMap.set('idle', `/images/pets/dog/${doge}_idle_8fps.gif`);
	animationMap.set('lie', `/images/pets/dog/${doge}_lie_8fps.gif`);
	animationMap.set('run', `/images/pets/dog/${doge}_run_8fps.gif`);
	animationMap.set('swipe', `/images/pets/dog/${doge}_swipe_8fps.gif`);
	animationMap.set('walk', `/images/pets/dog/${doge}_walk_8fps.gif`);
	animationMap.set('walkFast', `/images/pets/dog/${doge}_walk_fast_8fps.gif`);

	let playSpace: HTMLDivElement;
  let dogePos: HTMLDivElement;

  type ActiveAnimation = 'idle' | 'lie' | 'run' | 'swipe' | 'walk' | 'walkFast';

	let activeAnimation: ActiveAnimation = 'walk';

  type TransitionProbability = {
    idle: number
    lie: number
    run: number
    swipe: number
    walk: number
    walkFast: number
  }

  let transitionMap = new Map<ActiveAnimation, TransitionProbability>()
  transitionMap.set('idle', {
    idle: 0.2,
    lie: 0.3,
    swipe: 0.3,
    walk: 0.1,
    walkFast: 0.05,
    run: 0.05,
  })
  transitionMap.set('lie', {
    idle: 0.2,
    lie: 0.3,
    swipe: 0.02,
    walk: 0.1,
    walkFast: 0.05,
    run: 0.05,
  })
  transitionMap.set('swipe', {
    idle: 0.2,
    lie: 0.15,
    swipe: 0.3,
    walk: 0.2,
    walkFast: 0.1,
    run: 0.05,
  })
  transitionMap.set('walk', {
    idle: 0.3,
    lie: 0.1,
    swipe: 0.1,
    walk: 0.3,
    walkFast: 0.15,
    run: 0.05,
  })
  transitionMap.set('walkFast', {
    idle: 0.075,
    lie: 0.015,
    swipe: 0.01,
    walk: 0.2,
    walkFast: 0.5,
    run: 0.2,
  })
  transitionMap.set('run', {
    idle: 0.05,
    lie: 0.02,
    swipe: 0.03,
    walk: 0.05,
    walkFast: 0.25,
    run: 0.5,
  })

	let animationFrame;

	let flip = false;

  const doFlip = () => {
    flip = !flip;
  }

  const handleResize = async() => {
    const posUnit = 'px'
    const dogeImgXPos = Number(dogePos.style.getPropertyValue('--doge-offset').slice(0, -posUnit.length));  // remove 'px' from end
    const dogeImgXPosPercent = (dogeImgXPos/(playSpace.offsetWidth - 16))*100;
    console.log(dogeImgXPosPercent)
    if (!(dogeImgXPosPercent < 0 || dogeImgXPosPercent > 100)) {
      return
    }
    // const stationaryAnimations = ['idle', 'lie', 'swipe'] as Array<Partial<ActiveAnimation>>;
    // if (stationaryAnimations.includes(activeAnimation)) {
    //   return
    // }
    // activeAnimation = stationaryAnimations[Math.floor(Math.random() * stationaryAnimations.length)] as ActiveAnimation;
    if (dogeImgXPosPercent < 0) {
      dogePos.style.setProperty('--doge-offset', `0px`);
    } else {
      dogePos.style.setProperty('--doge-offset', `${playSpace.offsetWidth - 32}px`);
    }
  }

  async function updatePosition() {
    const RUN_SPEED = 0.5;
    const WALK_SPEED = 0.25;
    const WALK_FAST_SPEED = 0.40;
    const posUnit = 'px'
    const dogeImgXPos = Number(dogePos.style.getPropertyValue('--doge-offset').slice(0, -posUnit.length));  // remove 'px' from end
    const dogeImgXPosPercent = (dogeImgXPos/(playSpace.offsetWidth - 16))*100;
    if (dogeImgXPosPercent < 0 || dogeImgXPosPercent > 100) {
      doFlip();
    }
    if (activeAnimation === "run" ) {
      dogePos.style.setProperty('--doge-offset', `${dogeImgXPos + (flip ? -RUN_SPEED : RUN_SPEED)}px`);
      return
    }
    if (activeAnimation === "walk" ) {
      dogePos.style.setProperty('--doge-offset', `${dogeImgXPos + (flip ? -WALK_SPEED : WALK_SPEED)}px`);
      return
    } 
    if (activeAnimation === "walkFast" ) {
      dogePos.style.setProperty('--doge-offset', `${dogeImgXPos + (flip ? -WALK_FAST_SPEED : WALK_FAST_SPEED)}px`);
      return
    }
    dogePos.style.setProperty('--doge-offset', `${dogeImgXPos}px`);
  }

  async function updateState() {
    const CHANGE_DIRECTION_PROBAB = 0.9987;
    const CHANGE_DIRECTION_RIGHT_NOW = Math.random() > CHANGE_DIRECTION_PROBAB;
    // if change direction right now, then flip
    if (CHANGE_DIRECTION_RIGHT_NOW) {
      doFlip();
    }
    if (playSpace.offsetWidth <= 33) {
      dogePos.style.setProperty('--doge-offset', `0px`);
      const stationaryAnimations = ['idle', 'lie', 'swipe'] as Array<Partial<ActiveAnimation>>;
      if (stationaryAnimations.includes(activeAnimation)) {
        return
      }
      activeAnimation = stationaryAnimations[Math.floor(Math.random() * stationaryAnimations.length)] as ActiveAnimation;
      return
    }
    const CHANGE_STATE_PROBAB = 0.99875;
    const CHANGE_STATE_RIGHT_NOW = Math.random() > CHANGE_STATE_PROBAB;
    // if change state right now, then perform state transition logic
    if (CHANGE_STATE_RIGHT_NOW) {
      const transitionProbabilities = transitionMap.get(activeAnimation);
      if (!transitionProbabilities) {
        throw new Error(`transitionProbabilities not found for activeAnimation: ${activeAnimation}`)
      }
      const randomVal = Math.random();
      let cumulativeProbab = 0;
      for (const nextState of Object.keys(transitionProbabilities)) {
        cumulativeProbab += transitionProbabilities[nextState as ActiveAnimation];
        if (randomVal < cumulativeProbab) {
          activeAnimation = nextState as ActiveAnimation;
          break;
        }
      }
    }
    await updatePosition();
  }

	async function animate() {
		animationFrame = requestAnimationFrame(animate);
    await updateState();
	}

	onMount(() => {
    animationFrame = requestAnimationFrame(animate);
	});

	interface $$Props extends HTMLAttributes<HTMLDivElement> {}
</script>

<div {...$$restProps} class={`pet-doge ${$$restProps.class}`} bind:this={playSpace}>
	<div class="pet-pos" bind:this={dogePos}>
    {#key activeAnimation}
      <img
        class="doge"
        src={animationMap.get(activeAnimation)}
        alt="doge"
        width="34px"
        class:flip={flip}
      />
    {/key}
  </div>
</div>
<svelte:window on:resize={handleResize} />

<style lang="postcss">
	.pet-pos {
		transform: translateX(var(--doge-offset, 1));
	}
  .flip {
    transform: scaleX(-1);
  }
</style>
