<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import Header from '$lib/fragments/Header/Header.svelte';
	import Transition from '$lib/components/Transition.svelte';
	export let data
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>
	<!-- Page Route Content -->
	<div class="container mx-auto mt-24">
		<Transition url={data.url}>
			<slot />
		</Transition>
	</div>
	<svelte:fragment slot="pageFooter">
		<div class="container mx-auto mb-2">
			<hr class="mb-2" />
			<!-- <div class="flex justify-center text-center align-center">
				Made with ❤️ by Soham<br />
				All project files available on GitHub
			</div> -->
			<div class="flex justify-center text-center align-center">
				I enjoyed making this, I hope you enjoyed reading it :D
			</div>
		</div>
	</svelte:fragment>
</AppShell>
