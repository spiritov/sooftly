<script>
  import BestOf from '$lib/components/selectables/BestOf.svelte';
  import Inputs from '$lib/components/Inputs.svelte';
  import PlayerSelect from '$lib/components/PlayerSelect.svelte';
  import Settings from '$lib/components/Settings.svelte';

  import { settings, categories } from '$lib/stores/settings.svelte';
  import StageSelect from '$lib/components/StageSelect.svelte';
  import MapSelect from '$lib/components/MapSelect.svelte';
  import { mount, onMount } from 'svelte';

  let mounted = $state(false);

  onMount(() => {
    for (const [key, _] of categories) {
      const savedValues = localStorage.getItem(`saved_${key}s`);
      if (savedValues) {
        categories.set(key, JSON.parse(savedValues));
      }
    }
    mounted = true;
  });

  $effect(() => {
    if (mounted) {
      for (const [key, values] of categories) {
        localStorage.setItem(`saved_${key}s`, JSON.stringify(values));
      }
    }
  });

  $effect(() => {
    for (const [key, value] of Object.entries(settings)) {
      localStorage.setItem(key, value);
    }
  });
</script>

<div class="flex h-full w-full justify-center">
  <div
    class="bg-paleblack mt-8 flex w-2xl flex-col items-center gap-2 rounded-md p-4 text-center text-lg"
  >
    <span class="text-lavender mb-4">tourney overlay</span>
    <div class="flex flex-col">
      <Inputs />
      {@render separator('w-96')}
      <Settings />
      {@render separator('w-96')}
    </div>

    <BestOf />

    <div class="flex w-full">
      <PlayerSelect side={'left'} />
      <PlayerSelect side={'right'} />
    </div>

    <MapSelect />
    <StageSelect />
  </div>
</div>

{#snippet separator(styles)}
  <hr class="border-palegrey my-2 self-center border-1 border-solid {styles}" />
{/snippet}
