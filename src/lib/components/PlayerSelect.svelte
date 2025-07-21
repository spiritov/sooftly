<script>
  import { categories } from '$lib/stores/settings.svelte';
  import ButtonOption from './ButtonOption.svelte';
  import InputPR from './InputPR.svelte';

  let { side } = $props();
  let useBorder = $derived(side === 'left');
  let playerIndex = $state(-1);
  let flagIndex = $state(-1);
  let pr = $state('');

  function setIndex(category, index) {
    if (category === 'player') {
      playerIndex = index;
    } else {
      flagIndex = index;
    }
  }
</script>

<div class="flex w-full flex-col gap-1 {useBorder ? 'border-palegrey border-r-2' : ''}">
  <span>{side} name</span>
  <div class="flex gap-1">
    {#each categories.get('name') as name, index}
      <ButtonOption
        {name}
        selected={index === playerIndex}
        onclick={() => setIndex('player', index)}
      />
    {/each}
  </div>

  <span>flag</span>
  <div class="flex gap-1">
    {#each categories.get('flag') as flag, index}
      <ButtonOption
        name={flag}
        withFlag={true}
        selected={index === flagIndex}
        onclick={() => setIndex('flag', index)}
      />
    {/each}
  </div>

  <InputPR onkeypress={(e) => (pr = e.target.value)} />
</div>
