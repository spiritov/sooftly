<script>
  import { categories, settings, defaultStages } from '$lib/stores/settings.svelte';
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

  function resetStages() {
    categories.set('stage', defaultStages);
  }
</script>

<div class="flex w-full flex-col gap-1 px-2">
  <div class="flex w-full gap-2">
    <span class="text-left">stage</span>
    <button
      class="hover:text-salmon brightness-50 transition-all hover:cursor-pointer hover:underline hover:brightness-100"
      onclick={() => resetStages()}>(reset to default)</button
    >
  </div>
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
