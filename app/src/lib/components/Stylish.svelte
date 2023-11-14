<script lang="ts">
  import type {HTMLAttributes} from 'svelte/elements'
  
  interface $$Props extends HTMLAttributes<HTMLSpanElement> {
    banner?: string
  }
  export let banner = '';

  let bannerImage: HTMLImageElement;
  let bannerActive = false;

  let handleMouseMove = (e: MouseEvent) => {
    // if (!bannerActive) return;
    bannerImage.style.setProperty('--mouse-x', `${e.clientX}px`);
    bannerImage.style.setProperty('--mouse-y', `${e.clientY}px`);
  }
</script>

{#if banner.length > 0}
<img class='span-image' class:active={bannerActive} src={banner} alt="text context" bind:this={bannerImage} loading="lazy" />
<span on:mouseenter={() => bannerActive=true} on:mousedown={() => bannerActive=true} on:mouseleave={() => bannerActive = false} {...$$restProps} class={`${$$restProps.class} custom-span relative stylish`} aria-valuetext="Moving Picture">
  <slot />
</span>
{:else}
<span {...$$restProps} class={`custom-span stylish relative ${$$restProps.class}`}>
  <slot />
</span>
{/if}
<svelte:window on:mousemove={handleMouseMove} />

<style lang='postcss'>
  .span-image {
    position: fixed;
    top: var(--mouse-y);
    left: var(--mouse-x);
    transform: translate(-50%, -50%);
    z-index: -1;
    height: 250px;
    opacity: 0%;
    transition: opacity 0.15s ease-in-out;
    border-radius: 10px;
    &.active {
      display: block;
      opacity: 100%;
    }
  }
  .stylish {
    color: #f35626;
    background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
    background-image: linear-gradient(92deg, #f35626, #feab3a); /* For other browsers */
    -webkit-background-clip: text;
    background-clip: text; /* For other browsers */
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent; /* For other browsers */
    -webkit-animation: hue 15s infinite linear;
    animation: hue 15s infinite linear; /* For other browsers */
  }

  @-webkit-keyframes hue {
    from {
      -webkit-filter: hue-rotate(0deg);
    }
    to {
      -webkit-filter: hue-rotate(-360deg);
    }
  }

  @keyframes hue {
    from {
      filter: hue-rotate(0deg);
    }
    to {
      filter: hue-rotate(-360deg);
    }
  }
</style>
