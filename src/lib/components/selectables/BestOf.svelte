<script>
  import ButtonOption from './ButtonOption.svelte';
  import { settings } from '$lib/stores/settings.svelte';

  function setIndex(index) {
    settings.bestOf = index * 2 + 1;
  }
</script>

<div class="relative flex w-96 justify-center gap-1">
  <span class="absolute left-0">best of</span>
  {#each { length: 5 }, index}
    <ButtonOption
      name={index * 2 + 1}
      isBestOf={true}
      selected={(settings.bestOf - 1) / 2 === index}
      onclick={() => setIndex(index)}
    />
  {/each}
</div>
