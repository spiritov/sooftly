<script>
  import { categories, settings } from '$lib/stores/settings.svelte';
  import ButtonOption from './selectables/ButtonOption.svelte';
  import InputPR from './inputs/InputPR.svelte';
  import Score from './selectables/Score.svelte';

  let { side } = $props();
  let useBorder = $derived(side === 'left');
  let nameIndex = $state(-1);
  let flagIndex = $state(-1);

  function setIndex(category, index) {
    const key = side + category;
    settings[key] = categories.get(category.toLowerCase())[index];
    if (category === 'Name') {
      nameIndex = index;
    } else {
      flagIndex = index;
    }
  }

  function removeOption(e, category, index) {
    const values = categories.get(category);
    e.preventDefault();
    categories.set(category, values.toSpliced(index, 1));
  }
</script>

<div class="flex w-full flex-col gap-2 {useBorder ? 'border-palegrey border-r-2' : ''}">
  <span>{side} name</span>
  <div class="flex flex-wrap gap-1 px-2">
    {#each categories.get('name') as name, index}
      <ButtonOption
        {name}
        selected={index === nameIndex}
        onclick={() => setIndex('Name', index)}
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
        onclick={() => setIndex('Flag', index)}
        oncontextmenu={(e) => removeOption(e, 'flag', index)}
      />
    {/each}
  </div>

  {#if settings.usePR}
    <InputPR bind:value={settings[side + 'PR']} />
  {/if}

  <div class="flex w-full justify-center">
    <Score {side} />
  </div>
</div>
