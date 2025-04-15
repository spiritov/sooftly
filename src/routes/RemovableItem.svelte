<script>
	let { name, isFlag = false, sel = false, onSelect = null, onRemove = null } = $props();
</script>

<button
	class="button {sel ? 'border-violet-400 bg-violet-300' : ''}"
	onclick={onSelect}
	oncontextmenu={onRemove}
>
	<span>{name}</span>
	{#if isFlag}
		<img
			class="ml-1 flex h-6 self-center"
			src="https://countryflagsapi.netlify.app/flag/{name}.svg"
			alt={name}
		/>
	{/if}
</button>

<style lang="postcss">
	@reference '../app.css';
	@layer components {
		.button {
			@apply flex w-fit cursor-pointer rounded-md border-b-2 border-violet-400/60 bg-violet-300/60 px-2 text-zinc-800 transition-colors hover:border-violet-400 hover:bg-violet-300 starting:bg-violet-300;
		}
	}
</style>
