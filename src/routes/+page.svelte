<script>
	import { slide } from 'svelte/transition';
	import { SvelteMap } from 'svelte/reactivity';

	class Category {
		constructor(name, array) {
			this.name = name;
			this.array = array;
		}
	}
	let add = $state(true);
	let arrow = $derived(add ? '˅' : '˃');

	let players = $state(new Category('player', ['one', 'two']));
	let flags = $state(new Category('flag', []));
	let maps = $state(new Category('map', []));
	let stage = $state(
		new Category('stage', [
			'Round 1',
			'Round 2',
			'Quarterfinals',
			'Semifinals',
			'Finals',
			'Grand Finals',
			"Loser's Quarters",
			"Loser's Semis",
			"Loser's Finals"
		])
	);
	let categories = $derived([players, flags, maps, stage]);

	let playerInput = '';
	let flagInput = '';
	let mapInput = '';
	let stageInput = '';
	let categoriesInput = $state([playerInput, flagInput, mapInput, stageInput]);

	function toggleAdd() {
		add = !add;
	}
</script>

<div class="w-full justify-center">
	<div class="mt-8 w-2xl flex-col rounded-md bg-zinc-300/10 p-4 text-center text-lg">
		<div class="mb-8 justify-center text-violet-300">tourney overlay helper</div>
		<button onclick={toggleAdd} class="flex w-96 cursor-pointer self-center">{arrow} toggle</button>
		{#if add}
			<div transition:slide={{ duration: 150 }} class="w-96 flex-col gap-1 self-center">
				{#each categories as cat, i}
					<div class="relative justify-center">
						{#if i == 1}
							<a target="_blank" href="https://countryflagsapi.netlify.app/country-list">
								<div class="absolute left-0 transition-colors hover:text-violet-300">
									add {cat.name}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										class="ml-1 flex size-5 h-full self-center"
									>
										<path
											d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z"
										/>
										<path
											d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z"
										/>
									</svg>
								</div>
							</a>
						{:else}
							<div class="absolute left-0">add {cat.name}</div>
						{/if}
						<button
							onclick={() => {
								categories[i].array = [];
								categories = categories;
							}}
							class="absolute right-0 cursor-pointer transition-colors hover:text-red-400 hover:underline"
						>
							remove all
						</button>
						{#if i == 1}
							<input placeholder="alpha-2 code" class="input" />
						{:else}
							<input
								bind:value={categoriesInput[i]}
								onkeydown={(pressed) => {
									if (pressed.key == 'Enter') {
										categories[i].array.push(categoriesInput[i]);
										categoriesInput[i] = '';
										categories = categories;
									}
								}}
								class="input"
							/>
						{/if}
					</div>
				{/each}
			</div>
		{/if}

		<div class="mt-8 flex-row justify-between">
			<div class="basis-1/2 flex-col border-r-2 border-zinc-300/10 pr-2">
				<div class="justify-center">left player</div>
				{#each categories[0].array as player}
					<button class="button">{player}</button>
				{/each}
				<div class="justify-center">flag</div>
				<div>
					<div>map pr:</div>
					<input class="input" />
				</div>
			</div>
			<div class="basis-1/2 flex-col justify-items-center pl-2">
				<div class="justify-center">right player</div>
				{#each categories[0].array as player}
					<button class="button">{player}</button>
				{/each}
				<div class="justify-center">flag</div>
				<div>
					<div>map pr:</div>
					<input class="input" />
				</div>
			</div>
		</div>

		<div class="justify-center">score</div>
		<div>map</div>
		<div>stage</div>
	</div>
</div>

<style lang="postcss">
	@reference '../app.css';
	@layer components {
		div {
			@apply flex;
		}

		.input {
			@apply rounded-md border-b-2 border-zinc-300/20 bg-zinc-300/10 px-1 transition-colors outline-none hover:bg-zinc-300/15 focus:border-b-violet-300;
		}

		.button {
			@apply rounded-md border-b-2 border-violet-400 bg-violet-300 px-1 text-zinc-800;
		}
	}
</style>
