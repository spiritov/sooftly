<script>
  import BestOf from '$lib/components/controls/BestOf.svelte';
  import Inputs from '$lib/components/controls/Inputs.svelte';
  import PlayerSelect from '$lib/components/controls/PlayerSelect.svelte';
  import Settings from '$lib/components/controls/Settings.svelte';

  import { settings, categories } from '$lib/stores/settings.svelte';
  import StageSelect from '$lib/components/controls/StageSelect.svelte';
  import MapSelect from '$lib/components/controls/MapSelect.svelte';
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
    class="bg-paleblack relative mt-8 flex w-2xl flex-col items-center gap-2 rounded-md p-4 text-center text-lg"
  >
    <span class="text-lavender mb-4">tourney overlay</span>
    <span
      class="hover:text-lavender absolute right-8 brightness-50 transition-all hover:cursor-pointer hover:underline hover:brightness-100"
      >copy overlay link</span
    >

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
