<script>
  import { browser } from '$app/environment';
  import Credit from '$lib/components/thanks/Credit.svelte';
  import { settings } from '$lib/stores/settings.svelte';
  import { credits } from './credits';

  if (browser) {
    // update initial settings from localStorage (font only..)
    for (const [key, _] of Object.entries(settings)) {
      settings[key] = JSON.parse(localStorage.getItem(key));
    }

    window.addEventListener('storage', (event) => {
      settings[event.key] = JSON.parse(event.newValue);
    });
  }
</script>

<div class="font-{settings.font.toLowerCase()} flex flex-col gap-12 pt-8">
  <div class="flex w-full justify-center gap-64">
    <div class="  flex flex-col gap-2 text-center text-5xl">
      <span>Head Organizers</span>
      <div class="flex w-full flex-row justify-center gap-12">
        {#each credits.organizers as credit}
          <Credit {credit} size="xl" />
        {/each}
      </div>
    </div>

    <div class="flex flex-col gap-4 text-center text-5xl">
      <span>Executive Producers</span>
      <div class="flex w-full flex-row justify-center gap-12">
        {#each credits.exec_producers as credit}
          <Credit {credit} size="xl" />
        {/each}
      </div>
    </div>
  </div>

  <div class="flex flex-col items-center gap-2 text-center text-5xl">
    <span>Production</span>
    <div class="flex justify-center gap-24">
      <div class="flex flex-col items-center gap-4 text-4xl">
        <span>Broadcast</span>
        <Credit credit={credits.production.broadcaster} size="lg" />
      </div>
      <div class="flex flex-col items-center gap-4 text-4xl">
        <span>Overlay</span>
        {@render mur()}
      </div>
      <div class="flex flex-col items-center gap-4 text-4xl">
        <span>Trailer</span>
        <div class="flex h-full gap-8">
          {#each credits.production.trailer as credit}
            <Credit {credit} size="lg" />
          {/each}
        </div>
      </div>
      <div class="flex flex-col items-center gap-4 text-4xl">
        <span>Map Transitions</span>
        <Credit credit={credits.production.map_transitions} size="lg" />
      </div>
    </div>
  </div>

  <div class="flex w-full justify-center gap-32">
    <div class="flex h-full flex-col items-center gap-4 text-center text-4xl">
      <span>Server Infrastructure</span>
      <Credit credit={credits.server_management} size="lg" />
    </div>

    <div class="flex flex-col items-center gap-4 text-center text-4xl">
      <span>Ingame HUD</span>
      <div class="flex h-full gap-8">
        {#each credits.hud as credit}
          <Credit {credit} size="md" />
        {/each}
      </div>
    </div>
  </div>

  <div class="flex w-full justify-center gap-16">
    <div class="flex w-5/12 flex-col items-center gap-4 text-4xl">
      <span>Jump Fortress Consultants</span>
      <div class="flex flex-wrap justify-center gap-x-6 gap-y-2">
        {#each credits.consultants as credit}
          <Credit {credit} size="sm" />
        {/each}
      </div>
    </div>
    <div class="flex w-1/3 flex-col items-center gap-4 text-4xl">
      <span>Special Thanks 🤍</span>
      <div class="flex flex-wrap justify-center gap-x-8 gap-y-2">
        {#each credits.special_thanks as credit}
          <Credit {credit} size="sm" />
        {/each}
      </div>
    </div>
  </div>
</div>

{#snippet mur()}
  <div class="flex h-full items-center gap-10">
    <!-- svelte-ignore a11y_missing_attribute -->
    <img
      class="relative scale-200 bg-auto"
      style="image-rendering: pixelated;"
      src="https://play.pokemonshowdown.com/sprites/gen5ani/zigzagoon.gif"
    />
    <span>mur</span>
  </div>
{/snippet}
