<script lang="ts">
	import ThreeDStuff from "$lib/fragments/ThreeDStuff/ThreeDStuff.svelte";

	
</script>


<div class="container h-full mx-auto">
	<div class="hidden lg:flex">
		<div class='w-1/2'>
			<h1 class="gotham-ultra text-8xl">Hi</h1>
			<span class="gotham-ultra text-8xl" style='display:inline-block; margin-right:1rem'>I'm </span>
			<span class='gotham-ultra text-8xl stylish' style='display:inline-block'>Ham</span>
			<span class='gotham-ultra text-8xl'>!</span>
		</div>
		<div class='w-1/2'>
			<ThreeDStuff />
		</div>
	</div>
	<div class='lg:hidden'>
		<h1 class="gotham-ultra text-8xl">Hi</h1>
		<span class="gotham-ultra text-8xl" style='display:inline-block; margin-right:1rem'>I'm </span>
		<span class='gotham-ultra text-8xl stylish' style='display:inline-block'>Ham</span>
		<span class='gotham-ultra text-8xl'>!</span>
		<!-- <h1 class="gotham-ultra text-8xl">Soham</h1> -->
	</div>
</div>

<!-- <style lang="postcss">
	figure {
		@apply flex relative flex-col;
	}
	figure svg,
	.img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite, glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style> -->
