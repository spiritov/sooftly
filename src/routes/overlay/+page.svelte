<script>
	import { browser } from '$app/environment';

	let left_pr = $state('-');
	let rght_pr = $state('-');
	let max_score = $state(2);
	let left_player = $state('');
	let rght_player = $state('');
	let left_score = $state(0);
	let rght_score = $state(0);
	let left_flag = $state('');
	let rght_flag = $state('');
	let map = $state('');
	let stage = $state('');
	let font = $state('mono');

	if (browser) {
		window.addEventListener('storage', (storage) => {
			switch (storage.key) {
				case 'left_pr':
					left_pr = localStorage.getItem('left_pr');
					return;
				case 'rght_pr':
					rght_pr = localStorage.getItem('rght_pr');
					return;
				case 'max_score':
					max_score = localStorage.getItem('max_score');
					return;
				case 'left_player':
					left_player = localStorage.getItem('left_player');
					return;
				case 'rght_player':
					rght_player = localStorage.getItem('rght_player');
					return;
				case 'left_score':
					left_score = localStorage.getItem('left_score');
					return;
				case 'rght_score':
					rght_score = localStorage.getItem('rght_score');
					return;
				case 'left_flag':
					left_flag = localStorage.getItem('left_flag');
					return;
				case 'rght_flag':
					rght_flag = localStorage.getItem('rght_flag');
					return;
				case 'overlay_map':
					map = localStorage.getItem('overlay_map');
					return;
				case 'overlay_stage':
					stage = localStorage.getItem('overlay_stage');
					return;
				case 'font':
					font = localStorage.getItem('font');
					return;
			}
		});
	}
</script>

<div class="font-{font} block">
	<div class="relative h-24 w-full">
		<div
			class="relative ml-auto h-full basis-1/2 flex-row-reverse gap-8 bg-gradient-to-l from-orange-300/50 from-15% to-black/10 to-45%"
		>
			<div class="mr-36 w-24 flex-col items-center justify-center">
				<div class="text-3xl">PR</div>
				<div class="text-4xl">{left_pr}</div>
			</div>
			<div class="flex-row-reverse items-center gap-2">
				{#each { length: left_score }}
					<div
						class="size-10 border-4 border-white/50 bg-orange-300 transition-colors duration-1000 starting:border-white/50 starting:bg-orange-300/0"
					></div>
				{/each}
				{#each { length: max_score - left_score }}
					<div
						class="size-10 border-4 border-white/50 transition-colors starting:border-white/50 starting:bg-orange-300/0"
					></div>
				{/each}
			</div>
			<div class="absolute left-0">
				{#if left_flag !== ''}
					<img
						class="flex h-24"
						src="https://countryflagsapi.netlify.app/flag/{left_flag}.svg"
						alt="flag"
					/>
				{/if}
				<div class="ml-4 h-24 items-center text-5xl">{left_player}</div>
			</div>
		</div>

		<div
			class="relative mr-auto h-full basis-1/2 gap-8 bg-gradient-to-r from-orange-300/50 from-15% to-black/10 to-45%"
		>
			<div class="ml-36 w-24 flex-col items-center justify-center">
				<div class="text-3xl">PR</div>
				<div class="text-4xl">{rght_pr}</div>
			</div>
			<div class="flex-row items-center gap-2">
				{#each { length: rght_score }}
					<div
						class="size-10 border-4 border-white/50 bg-orange-300 transition-colors duration-1000 starting:border-white/50 starting:bg-orange-300/0"
					></div>
				{/each}
				{#each { length: max_score - rght_score }}
					<div
						class="size-10 border-4 border-white/50 transition-colors starting:border-white/50 starting:bg-orange-300/0"
					></div>
				{/each}
			</div>
			<div class="absolute right-0 flex-row-reverse">
				{#if rght_flag !== ''}
					<img
						class="flex h-24"
						src="https://countryflagsapi.netlify.app/flag/{rght_flag}.svg"
						alt="flag"
					/>
				{/if}
				<div class="mr-4 h-24 items-center text-5xl">{rght_player}</div>
			</div>
		</div>
	</div>

	<div class="h-[540px] w-full bg-white/40">
		<div
			class="size-full basis-1/2 items-center justify-center border-r-[1px] border-orange-300/50"
		>
			960x540px
		</div>
		<div
			class="size-full basis-1/2 items-center justify-center border-l-[1px] border-orange-300/50"
		>
			960x540px
		</div>
	</div>

	<div class="w-full justify-center">
		<div
			class="min-w-96 flex-col items-center justify-center rounded-b-[4.5rem] bg-orange-300/50 py-2"
		>
			<div>{map}</div>
			<div class="opacity-85">{stage}</div>
		</div>
	</div>
</div>

<style lang="postcss">
	@reference '../../app.css';
	@layer components {
		div {
			@apply flex text-4xl;
		}
	}
</style>
