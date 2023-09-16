<script>
	import Dog from '$lib/components/pets/dog/Dog.svelte';
import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<nav
	class="variant-glass-surface p-2 rounded-md mt-7 h-12 fixed md:flex container mx-auto"
>
	<div class="pet-space absolute">
		<Dog />
	</div>
	<button
		class="hamburger flex flex-col justify-evenly opacity-100 w-full sm:w-0 sm:opacity-0 transition-all duration-300"
	>
		<hr class='variant-ringed-surface w-full' />
		<hr class='variant-ringed-surface w-full' />
		<hr class='variant-ringed-surface w-full' />
</button>
	<div
		class="justify-between items-center opacity-0 overflow-hidden sm:opacity-100 transition-all duration-300 sm:flex sm:w-full"
	>
		<div class="flex gap-4">
			<a class="btn btn-sm variant-ghost-surface" href="/" rel="noreferrer"> Home </a>
			<a class="btn btn-sm variant-ghost-surface" href="/" rel="noreferrer"> Stuff </a>
			<a class="btn btn-sm variant-ghost-surface" href="/" rel="noreferrer"> Socials </a>
		</div>
		<div class="flex gap-4 items-center">
			<a class="btn btn-sm variant-ghost-surface" href="/blog" rel="noreferrer"> Blog </a>
			<LightSwitch />
		</div>
	</div>
</nav>

<style lang="postcss">
	nav {
		.hamburger {
			height: 100%;
			hr {
				border-width: 2px;
				border-radius: 4px;
			}
		}

		.pet-space {
				transform: translate(0, -135%);
				width: calc(100% - 16px);
			}

		left: 16px;

		transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
		width: 48px;

		@media (min-width: 640px) {
			left: 16px;
			right: 16px;

			width: calc(100% - 32px);
			height: auto;
			display: flex;
			.pet-space {
				transform: translate(0, -135%);
				width: calc(100% - 16px);
			}
		}

		@media (min-width: 768px) {
			display: flex;
		}

		@media (min-width: 1024px) {
			display: flex;
		}
	}
</style>
