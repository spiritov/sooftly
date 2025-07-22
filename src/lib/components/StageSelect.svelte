<script>
  import { categories, settings } from '$lib/stores/settings.svelte';
  import ButtonOption from './selectables/ButtonOption.svelte';

  let stageIndex = $state(-1);

  function setIndex(index) {
    stageIndex = index;
    settings.stage = categories.get('stage')[index];
  }

  function removeOption(e, index) {
    const values = categories.get('stage');
    e.preventDefault();
    categories.set('stage', values.toSpliced(index, 1));
  }
</script>

<div class="flex w-full flex-col gap-1">
  <span class="text-left">stage</span>
  <div class="flex flex-wrap gap-1">
    {#each categories.get('stage') as name, index}
      <ButtonOption
        {name}
        selected={index === stageIndex}
        onclick={() => setIndex(index)}
        oncontextmenu={(e) => removeOption(e, index)}
      />
    {/each}
  </div>
</div>
