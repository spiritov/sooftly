<script>
  import { categories, settings } from '$lib/stores/settings.svelte';
  import ButtonOption from './selectables/ButtonOption.svelte';
  import InputPR from './InputPR.svelte';

  let { side } = $props();
  let useBorder = $derived(side === 'left');
  let playerIndex = $state(-1);
  let flagIndex = $state(-1);
  let pr = $state('');

  function setIndex(category, index) {
    if (category === 'name') {
      playerIndex = index;
      if (side === 'left') {
        settings.leftName = categories.get('name')[index];
      } else {
        settings.rightName = categories.get('name')[index];
      }
    } else {
      if (side === 'left') {
        settings.leftFlag = categories.get('name')[index];
      } else {
        settings.rightFlag = categories.get('name')[index];
      }
      flagIndex = index;
    }
  }

  function removeOption(e, category, index) {
    const values = categories.get(category);
    e.preventDefault();
    categories.set(category, values.toSpliced(index, 1));
  }
</script>

<div class="flex w-full flex-col gap-1 {useBorder ? 'border-palegrey border-r-2' : ''}">
  <span>{side} name</span>
  <div class="flex flex-wrap gap-1 px-2">
    {#each categories.get('name') as name, index}
      <ButtonOption
        {name}
        selected={index === playerIndex}
        onclick={() => setIndex('name', index)}
        oncontextmenu={(e) => removeOption(e, 'name', index)}
      />
    {/each}
  </div>

  <span>flag</span>
  <div class="flex flex-wrap gap-1 px-2">
    {#each categories.get('flag') as flag, index}
      <ButtonOption
        name={flag}
        withFlag={true}
        selected={index === flagIndex}
        onclick={() => setIndex('flag', index)}
        oncontextmenu={(e) => removeOption(e, 'flag', index)}
      />
    {/each}
  </div>

  {#if settings.usePR}
    <InputPR onkeypress={(e) => (pr = e.target.value)} />
  {/if}
</div>
