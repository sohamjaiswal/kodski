<script lang="ts">
	import type { IGlossyCards } from './GlossyCards.types';

	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface $$Props extends IGlossyCards {}

	export let cards = Array(6);
	export let height = 260;
	export let width = 300;

	const handleContainerMouseMove = (e: any) => {
		//eslint-disable-next-line no-undef
		const cards: HTMLCollectionOf<Element> = document.getElementsByClassName('card');
		//eslint-disable-next-line no-undef
		const realCards = cards as HTMLCollectionOf<HTMLElement>;
		if (realCards) {
			for (let i = 0; realCards.length; i++) {
				realCards[i].setAttribute('aria-label', `Glossy Card ${i}`);
				const rect = realCards[i].getBoundingClientRect(),
					x = e.clientX - rect.left,
					y = e.clientY - rect.top;

				realCards[i].style.setProperty('--mouse-x', `${x}px`);
				realCards[i].style.setProperty('--mouse-y', `${y}px`);
			}
		}
	};
</script>

<div class="cards" on:mousemove={handleContainerMouseMove} >
	{#each cards as card}
		<div class="card" style={`height: ${height}px; width: ${width}px`}>
			<div class="card-border" />
			<div class={`card-content`}>
				<svelte:component this={card.component} {...card.value} />
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	.clickable {
		cursor: pointer;
	}

	.cards {
		display: flex;

		flex-wrap: wrap;

		width: 100%;
		gap: 8px;

		justify-content: center;

		.card {
			background-color: rgba(255, 255, 255, 0.1);
			position: relative;

			&::before,
			.card-border {
				border-radius: inherit;
				content: '';
				height: 100%;
				position: absolute;
				left: 0px;
				top: 0px;
				opacity: 0;
				transition: opacity 500ms;
				width: 100%;
				z-index: 2;
			}

			&::before {
				background: radial-gradient(
					800px circle at var(--mouse-x) var(--mouse-y),
					rgba(255, 255, 255, 0.06),
					transparent 40%
				);
				z-index: 3;
			}

			.card-border {
				background: radial-gradient(
					400px circle at var(--mouse-x) var(--mouse-y),
					rgba(255, 255, 255, 0.3),
					transparent 40%
				);
				z-index: 1;
			}

			&:hover::before {
				opacity: 1;
			}
			> .card-content {
				height: calc(100% - 2px);
				width: calc(100% - 2px);
				background-color: var(--secondary);
				border-radius: inherit;
				margin: 1px;
				position: relative;
				z-index: 4;
				overflow: hidden;
			}
		}
		&:hover > .card > .card-border {
			opacity: 1;
		}
	}
</style>
