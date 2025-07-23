<script>
  import { categories } from '$lib/stores/settings.svelte';
  import InputCategory from './inputs/InputCategory.svelte';
  import { slide } from 'svelte/transition';

  let display = $state(true);
  let arrow = $derived(display ? '˅' : '>');

  function inputKeypress(e, category) {
    const inputValue = e.target.value;
    if (e.key === 'Enter' && inputValue.length > 0) {
      const values = categories.get(category);

      if (category === 'flag' && inputValue.length === 2) {
        categories.set(category, values.concat([inputValue.toUpperCase()]));
        e.target.value = '';
      } else {
        categories.set(category, values.concat([[inputValue]]));
        e.target.value = '';
      }
    }
  }
</script>

{#key display}
  <button
    onclick={() => (display = !display)}
    class="text-lavender flex w-96 cursor-pointer self-center text-left">{arrow} buttons</button
  >
{/key}

{#if display}
  <div class="flex w-96 flex-col gap-0.5 self-center" transition:slide={{ duration: 250 }}>
    {#each categories as [category, _]}
      <InputCategory {category} onkeypress={(e) => inputKeypress(e, category)} />
    {/each}
  </div>
{/if}
