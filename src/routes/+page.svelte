<script>
	import { browser } from '$app/environment';
	import { slide } from 'svelte/transition';
	import { SvelteMap } from 'svelte/reactivity';
	import RemovableItem from './RemovableItem.svelte';

	let add = $state(true);
	let arrow = $derived(add ? '˅' : '˃');

	let categories = $state(
		new SvelteMap([
			['player', []],
			['flag', []],
			['map', []],
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

	//button-assigned indexes
	let sel_best_of = $state(1);
	let sel_map = $state(-1);
	let sel_left_player = $state(-1);
	let sel_rght_player = $state(-1);
	let sel_left_flag = $state(-1);
	let sel_rght_flag = $state(-1);
	let sel_stage = $state(-1);
	let sel_font = $state(0);

	//derived from buttons, or manually assigned
	let best_of = $derived(sel_best_of * 2 + 1);
	let map = $derived(categories.get('map')[sel_map]);
	let left_player = $derived(categories.get('player')[sel_left_player]);
	let rght_player = $derived(categories.get('player')[sel_rght_player]);
	let left_score = $state(0);
	let rght_score = $state(0);
	let left_pr = $state('');
	let rght_pr = $state('');
	let left_flag = $derived(categories.get('flag')[sel_left_flag]);
	let rght_flag = $derived(categories.get('flag')[sel_rght_flag]);
	let stage = $derived(categories.get('stage')[sel_stage]);
	let font = $derived(sel_font === 0 ? 'mono' : 'outfit');

	function toggleAdd() {
		add = !add;
	}

	function removeItem(evt, cat, i) {
		evt.preventDefault();
		categories.set(cat, categories.get(cat).toSpliced(i, 1));
		localStorage.setItem(cat, JSON.stringify(categories.get(cat)));
	}

	function editScore(left, n) {
		const nn = n <= 0 ? 0 : n > sel_best_of ? sel_best_of + 1 : n;
		if (left) {
			left_score = nn;
			localStorage.setItem('left_score', left_score);
		} else {
			rght_score = nn;
			localStorage.setItem('rght_score', rght_score);
		}
	}

	//load last set categories, on page load
	if (browser) {
		if ('player' in localStorage)
			categories.set('player', JSON.parse(localStorage.getItem('player')));
		if ('map' in localStorage) categories.set('map', JSON.parse(localStorage.getItem('map')));
		if ('flag' in localStorage) categories.set('flag', JSON.parse(localStorage.getItem('flag')));
		if ('stage' in localStorage && JSON.parse(localStorage.getItem('stage')).length !== 0)
			categories.set('stage', JSON.parse(localStorage.getItem('stage')));

		//initialize these as empty on page load, for overlay page
		localStorage.setItem('left_pr', '');
		localStorage.setItem('rght_pr', '');
		localStorage.setItem('max_score', 2);
		localStorage.setItem('left_player', '');
		localStorage.setItem('rght_player', '');
		localStorage.setItem('left_score', 0);
		localStorage.setItem('right_score', 0);
		localStorage.setItem('left_flag', '');
		localStorage.setItem('rght_flag', '');
		localStorage.setItem('overlay_map', '');
		localStorage.setItem('overlay_stage', '');
		localStorage.setItem('font', 'mono');
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
				{#each categories as [cat, array]}
					<div class="relative justify-center">
						{#if cat == 'flag'}
							<a target="_blank" href="https://countryflagsapi.netlify.app/country-list">
								<div class="absolute left-0 transition-colors hover:text-violet-300">
									add {cat}
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
							<div class="absolute left-0">add {cat}</div>
						{/if}
						<button
							onclick={() => {
								categories.set(cat, []);
								localStorage.removeItem(cat);
							}}
							class="absolute right-0 cursor-pointer transition-colors hover:text-red-400 hover:underline"
						>
							remove all
						</button>
						{#if cat == 'flag'}
							<input
								placeholder="alpha-2 code"
								class="input"
								onkeypress={(e) => {
									if (e.key == 'Enter') {
										if (e.target.value.length === 2) {
											categories.set(
												cat,
												categories.get(cat).concat([e.target.value.toUpperCase()])
											);
											localStorage.setItem(cat, JSON.stringify(categories.get(cat)));
										}
										e.target.value = '';
									}
									inputs.set(cat, e.target.value);
								}}
							/>
						{:else}
							<input
								class="input"
								onkeypress={(e) => {
									if (e.key == 'Enter') {
										categories.set(cat, categories.get(cat).concat([e.target.value]));
										localStorage.setItem(cat, JSON.stringify(categories.get(cat)));
										e.target.value = '';
									}
									inputs.set(cat, e.target.value);
								}}
							/>
						{/if}
					</div>
				{/each}
				<div class="gap-2">
					<span>font</span>
					<button
						class="button {sel_font === 0 ? 'bg-violet-300' : ''}"
						onclick={() => {
							sel_font = 0;
							localStorage.setItem('font', 'mono');
						}}>Ubuntu Mono</button
					>
					<button
						class="font-outfit button {sel_font === 1 ? 'bg-violet-300' : ''}"
						onclick={() => {
							sel_font = 1;
							localStorage.setItem('font', 'outfit');
						}}>Outfit</button
					>
				</div>
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
						localStorage.setItem('max_score', i + 1);
					}}>{i * 2 + 1}</button
				>
			{/each}
		</div>

		<div>map</div>
		<div class="flex-wrap gap-2">
			{#each categories.get('map') as map, i}
				{#if sel_map === i}
					<RemovableItem
						name={map}
						sel={true}
						onSelect={() => {
							sel_map = i;
							localStorage.setItem('overlay_map', map);
						}}
						onRemove={(e) => removeItem(e, 'map', i)}
					/>
				{:else}
					<RemovableItem
						name={map}
						onSelect={() => {
							sel_map = i;
							localStorage.setItem('overlay_map', map);
						}}
						onRemove={(e) => removeItem(e, 'map', i)}
					/>
				{/if}
			{/each}
		</div>

		<div class="mt-4 flex-row justify-between">
			<div class="basis-1/2 flex-col border-r-2 border-zinc-300/10 pr-2">
				<div class="justify-center">left player</div>
				<div class="flex-wrap gap-2">
					{#each categories.get('player') as player, i}
						{#if sel_left_player === i}
							<RemovableItem
								name={player}
								sel={true}
								onSelect={() => {
									sel_left_player = i;
									localStorage.setItem('left_player', left_player);
								}}
								onRemove={(e) => removeItem(e, 'player', i)}
							/>
						{:else}
							<RemovableItem
								name={player}
								onSelect={() => {
									sel_left_player = i;
									localStorage.setItem('left_player', left_player);
								}}
								onRemove={(e) => removeItem(e, 'player', i)}
							/>
						{/if}
					{/each}
				</div>

				<div class="justify-center">flag</div>
				<div class="flex-wrap gap-2">
					{#each categories.get('flag') as flag, i}
						{#if sel_left_flag === i}
							<RemovableItem
								name={flag}
								isFlag={true}
								sel={true}
								onSelect={() => {
									sel_left_flag = i;
									localStorage.setItem('left_flag', left_flag);
								}}
								onRemove={(e) => removeItem(e, 'flag', i)}
							/>
						{:else}
							<RemovableItem
								name={flag}
								isFlag={true}
								onSelect={() => {
									sel_left_flag = i;
									localStorage.setItem('left_flag', left_flag);
								}}
								onRemove={(e) => removeItem(e, 'flag', i)}
							/>
						{/if}
					{/each}
				</div>

				<div class="mt-4">
					<div>map pr:</div>
					<input
						bind:value={left_pr}
						class="input"
						oninput={(e) => localStorage.setItem('left_pr', e.target.value)}
					/>
				</div>
			</div>

			<div class="basis-1/2 flex-col justify-items-center pl-2">
				<div class="justify-center">right player</div>
				<div class="flex-wrap gap-2">
					{#each categories.get('player') as player, i}
						{#if sel_rght_player === i}
							<RemovableItem
								name={player}
								sel={true}
								onSelect={() => {
									sel_rght_player = i;
									localStorage.setItem('rght_player', rght_player);
								}}
								onRemove={(e) => removeItem(e, 'player', i)}
							/>
						{:else}
							<RemovableItem
								name={player}
								onSelect={() => {
									sel_rght_player = i;
									localStorage.setItem('rght_player', rght_player);
								}}
								onRemove={(e) => removeItem(e, 'player', i)}
							/>
						{/if}
					{/each}
				</div>

				<div class="justify-center">flag</div>
				<div class="flex-wrap gap-2">
					{#each categories.get('flag') as flag, i}
						{#if sel_rght_flag === i}
							<RemovableItem
								name={flag}
								isFlag={true}
								sel={true}
								onSelect={() => {
									sel_rght_flag = i;
									localStorage.setItem('rght_flag', rght_flag);
								}}
								onRemove={(e) => removeItem(e, 'flag', i)}
							/>
						{:else}
							<RemovableItem
								name={flag}
								isFlag={true}
								onSelect={() => {
									sel_rght_flag = i;
									localStorage.setItem('rght_flag', rght_flag);
								}}
								onRemove={(e) => removeItem(e, 'flag', i)}
							/>
						{/if}
					{/each}
				</div>

				<div class="mt-4">
					<div>map pr:</div>
					<input
						bind:value={rght_pr}
						class="input"
						oninput={(e) => localStorage.setItem('rght_pr', e.target.value)}
					/>
				</div>
			</div>
		</div>

		<div class="relative mt-4 justify-center">
			<div class="w-full justify-center">
				<button
					class="button size-8 justify-center rounded-r-none px-0"
					onclick={() => editScore(true, left_score + 1)}>+</button
				>
				<button class="button size-8 justify-center rounded-none bg-violet-300 px-0"
					>{left_score}</button
				>
				<button
					class="button size-8 justify-center rounded-l-none px-0"
					onclick={() => editScore(true, left_score - 1)}>-</button
				>
			</div>
			<div class="absolute">score</div>
			<div class="w-full justify-center">
				<button
					class="button size-8 justify-center rounded-r-none px-0"
					onclick={() => editScore(false, rght_score + 1)}>+</button
				>
				<button class="button size-8 justify-center rounded-none bg-violet-300 px-0"
					>{rght_score}</button
				>
				<button
					class="button size-8 justify-center rounded-l-none px-0"
					onclick={() => editScore(false, rght_score - 1)}>-</button
				>
			</div>
		</div>

		<div>stage</div>
		<div class="flex-wrap gap-2">
			{#each categories.get('stage') as stage, i}
				{#if sel_stage === i}
					<RemovableItem
						name={stage}
						sel={true}
						onSelect={() => {
							sel_stage = i;
							localStorage.setItem('overlay_stage', stage);
						}}
						onRemove={(e) => removeItem(e, 'stage', i)}
					/>
				{:else}
					<RemovableItem
						name={stage}
						onSelect={() => {
							sel_stage = i;
							localStorage.setItem('overlay_stage', stage);
						}}
						onRemove={(e) => removeItem(e, 'stage', i)}
					/>
				{/if}
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
