<script>
  import BestOf from '$lib/components/selectables/BestOf.svelte';
  import Inputs from '$lib/components/Inputs.svelte';
  import PlayerSelect from '$lib/components/PlayerSelect.svelte';
  import Settings from '$lib/components/Settings.svelte';

  import { settings } from '$lib/stores/settings.svelte';

  $effect(() => {
    for (const [key, value] of Object.entries(settings)) {
      localStorage.setItem(key, value);
    }
  });
</script>

<div class="flex h-full w-full justify-center">
  <div
    class="bg-paleblack mt-8 flex w-2xl flex-col items-center gap-1 rounded-md p-4 text-center text-lg"
  >
    <span class="text-lavender mb-4">tourney overlay</span>
    <Inputs />
    {@render separator('w-96')}
    <Settings />
    {@render separator('w-96')}

    <BestOf />

    <div class="flex w-full">
      <PlayerSelect side={'left'} />
      <PlayerSelect side={'right'} />
    </div>
  </div>
</div>

{#snippet separator(styles)}
  <hr class="border-palegrey my-2 self-center border-1 border-solid {styles}" />
{/snippet}
