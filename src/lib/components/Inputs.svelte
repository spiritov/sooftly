<script>
  import { categories } from '$lib/stores/settings.svelte';
  import InputCategory from './InputCategory.svelte';

  let display = $state(true);
  let arrow = $derived(display ? '˅' : '>');
</script>

{#key display}
  <button
    onclick={() => (display = !display)}
    class="flex w-96 cursor-pointer self-center text-left">{arrow} options</button
  >
{/key}

{#if display}
  <div class="flex w-96 flex-col gap-0.5 self-center">
    {#each categories as [category, _]}
      <InputCategory {category} />
    {/each}
  </div>
{/if}
