<script>
	import { slide } from 'svelte/transition';
	import { SvelteMap } from 'svelte/reactivity';

	let add = $state(true);
	let arrow = $derived(add ? '˅' : '˃');

	let categories = $state(
		new SvelteMap([
			['player', ['riot', 'exile', 'shanks', 'rellort']],
			['flag', ['SE', 'KR']],
			['map', ['jump_thing', 'jump_anotherthing']],
			[
				'stage',
				[
					'Round 1',
					'Round 2',
					'Quarterfinals',
					'Semifinals',
					'Finals',
					'Grand Finals',
					"Loser's Quarters",
					"Loser's Semis",
					"Loser's Finals"
				]
			]
		])
	);
	let inputs = $state(
		new SvelteMap([
			['player', ''],
			['flag', ''],
			['map', ''],
			['stage', '']
		])
	);

	let sel_best_of = $state(0);
	let sel_map = $state('');

	let sel_left_player = $state('');
	let sel_rght_player = $state('');
	let sel_left_flag = $state('');
	let sel_right_flag = $state('');
	let sel_left_pr = $state('');
	let sel_rght_pr = $state('');
	let left_score = $state(0);
	let rght_score = $state(0);

	let stage = '';

	function toggleAdd() {
		add = !add;
	}
</script>

<div class="w-full justify-center">
	<div class="mt-8 w-2xl flex-col rounded-md bg-zinc-300/10 p-4 text-center text-lg">
		<div class="mb-8 justify-center text-violet-300">tourney overlay helper</div>
		{#key arrow}
			<button onclick={toggleAdd} class="flex w-96 cursor-pointer self-center"
				>{arrow} toggle</button
			>
		{/key}
		{#if add}
			<div transition:slide={{ duration: 150 }} class="w-96 flex-col gap-1 self-center">
				{#each categories as [name, array]}
					<div class="relative justify-center">
						{#if name == 'flag'}
							<a target="_blank" href="https://countryflagsapi.netlify.app/country-list">
								<div class="absolute left-0 transition-colors hover:text-violet-300">
									add {name}
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
							<div class="absolute left-0">add {name}</div>
						{/if}
						<button
							onclick={() => {
								categories.set(name, []);
							}}
							class="absolute right-0 cursor-pointer transition-colors hover:text-red-400 hover:underline"
						>
							remove all
						</button>
						{#if name == 'flag'}
							<input
								placeholder="alpha-2 code"
								class="input"
								onkeypress={(e) => {
									if (e.key == 'Enter') {
										if (e.target.value.length === 2) {
											categories.set(
												name,
												categories.get(name).concat([e.target.value.toUpperCase()])
											);
										}
										e.target.value = '';
									}
									inputs.set(name, e.target.value);
								}}
							/>
						{:else}
							<input
								class="input"
								onkeypress={(e) => {
									if (e.key == 'Enter') {
										categories.set(name, categories.get(name).concat([e.target.value]));
										e.target.value = '';
									}
									inputs.set(name, e.target.value);
								}}
							/>
						{/if}
					</div>
				{/each}
			</div>
		{/if}

		<div class="relative mt-8 w-96 justify-center gap-2 self-center">
			<span class="absolute left-0">best of</span>
			{#each { length: 5 }, i}
				<button
					class="button size-8 justify-center px-0 {i === sel_best_of
						? 'border-violet-400 bg-violet-300'
						: ''}"
					onclick={() => {
						sel_best_of = i;
					}}>{i * 2 + 1}</button
				>
			{/each}
		</div>

		<div>map</div>
		<div class="flex-wrap gap-2">
			{#each categories.get('map') as map, i}
				<button
					class="button {map === sel_map ? 'border-violet-400 bg-violet-300' : ''}"
					onclick={() => {
						sel_map = map;
					}}
					oncontextmenu={(e) => {
						e.preventDefault();
						console.log('a');
						categories.set('map', categories.get('map').toSpliced(i));
					}}>{map}</button
				>
			{/each}
		</div>

		<div class="mt-4 flex-row justify-between">
			<div class="basis-1/2 flex-col border-r-2 border-zinc-300/10 pr-2">
				<div class="justify-center">left player</div>
				<div class="flex-wrap gap-2">
					{#each categories.get('player') as player}
						<button class="button">{player}</button>
					{/each}
				</div>
				<div class="justify-center">flag</div>
				<div class="flex-wrap gap-2">
					{#each categories.get('flag') as flag}
						<button class="button">
							<span>{flag}</span>
							<img
								class="ml-1 flex h-6 self-center"
								src="https://countryflagsapi.netlify.app/flag/{flag}.svg"
								alt={flag}
							/>
						</button>
					{/each}
				</div>
				<div class="mt-4">
					<div>map pr:</div>
					<input bind:value={sel_left_pr} class="input" />
				</div>
			</div>
			<div class="basis-1/2 flex-col justify-items-center pl-2">
				<div class="justify-center">right player</div>
				<div class="flex-wrap gap-2">
					{#each categories.get('player') as player}
						<button class="button">{player}</button>
					{/each}
				</div>
				<div class="justify-center">flag</div>
				<div class="flex-wrap gap-2">
					{#each categories.get('flag') as flag}
						<button class="button">
							<span>{flag}</span>
							<img
								class="ml-1 flex h-6 self-center"
								src="https://countryflagsapi.netlify.app/flag/{flag}.svg"
								alt={flag}
							/>
						</button>
					{/each}
				</div>
				<div class="mt-4">
					<div>map pr:</div>
					<input bind:value={sel_rght_pr} class="input" />
				</div>
			</div>
		</div>

		<div class="mt-4 justify-center">
			<div class="w-full justify-center">
				<button class="button size-8 justify-center rounded-r-none px-0">+</button>
				<button class="button size-8 justify-center rounded-none bg-violet-300 px-0"
					>{left_score}</button
				>
				<button class="button size-8 justify-center rounded-l-none px-0">-</button>
			</div>
			<div class="">score</div>
			<div class="w-full justify-center">
				<button class="button size-8 justify-center rounded-r-none px-0">+</button>
				<button class="button size-8 justify-center rounded-none bg-violet-300 px-0"
					>{rght_score}</button
				>
				<button class="button size-8 justify-center rounded-l-none px-0">-</button>
			</div>
		</div>

		<div>stage</div>
		<div class="flex-wrap gap-2">
			{#each categories.get('stage') as stage}
				<button class="button">{stage}</button>
			{/each}
		</div>
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
			@apply flex w-fit cursor-pointer rounded-md border-b-2 border-violet-400/60 bg-violet-300/60 px-2 text-zinc-800 transition-colors hover:border-violet-400 hover:bg-violet-300;
		}
	}
</style>
