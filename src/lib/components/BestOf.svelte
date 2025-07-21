<script>
  import ButtonOption from './ButtonOption.svelte';

  let bestOfIndex = $state(1);

  function setIndex(index) {
    bestOfIndex = index;
  }
</script>

<div class="relative flex w-96 justify-center gap-1">
  <span class="absolute left-0">best of</span>
  {#each { length: 5 }, index}
    <ButtonOption
      name={index * 2 + 1}
      isBestOf={true}
      selected={bestOfIndex === index}
      onclick={() => setIndex(index)}
    />
  {/each}
</div>
