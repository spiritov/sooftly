<script>
  import Inputs from '$lib/components/Inputs.svelte';
  import Settings from '$lib/components/Settings.svelte';
</script>

<div class="flex h-full w-full justify-center">
  <div class="bg-paleblack mt-8 flex w-2xl flex-col rounded-md p-4 text-center text-lg">
    <span class="text-lavender mb-4">tourney overlay</span>
    <Inputs />
    {@render separator('w-96')}
    <Settings />
    {@render separator('w-96')}
  </div>
</div>

{#snippet separator(styles)}
  <hr class="border-palegrey my-2 self-center border-1 border-solid {styles}" />
{/snippet}
