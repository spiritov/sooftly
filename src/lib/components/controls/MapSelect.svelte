<script>
  import { categories, settings } from '$lib/stores/settings.svelte';
  import ButtonOption from './selectables/ButtonOption.svelte';

  let mapIndex = $state(-1);

  function setIndex(index) {
    mapIndex = index;
    settings.map = categories.get('map')[index];
  }

  function removeOption(event, index) {
    const values = categories.get('map');
    event.preventDefault();
    categories.set('map', values.toSpliced(index, 1));
  }
</script>

<div class="w-full px-2 text-left">
  <span>map</span>
  <div class="flex flex-wrap gap-1">
    {#each categories.get('map') as map, index}
      <ButtonOption
        name={map}
        selected={index === mapIndex}
        onclick={() => setIndex(index)}
        oncontextmenu={(event) => removeOption(event, index)}
      />
    {/each}
  </div>
</div>
