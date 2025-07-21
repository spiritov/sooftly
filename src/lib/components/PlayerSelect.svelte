<script>
  import { categories } from '$lib/stores/settings.svelte';
  import ButtonOption from './ButtonOption.svelte';

  let { side } = $props();
  let playerIndex = $state(-1);
  let flagIndex = $state(-1);

  function setIndex(category, index) {
    if (category === 'player') {
      playerIndex = index;
    } else {
      flagIndex = index;
    }
  }
</script>

<div class="flex w-full flex-col">
  <span>{side}</span>

  <span>name</span>
  <div class="flex gap-1">
    {#each categories.get('name') as name, index}
      <ButtonOption {name} onclick={() => setIndex('player', index)} />
    {/each}
  </div>

  <span>flag</span>
  <div class="flex gap-1">
    {#each categories.get('flag') as flag, index}
      <ButtonOption name={flag} withFlag={true} onclick={() => setIndex('flag', index)} />
    {/each}
  </div>
</div>
