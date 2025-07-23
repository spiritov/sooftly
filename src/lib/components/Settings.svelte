<script>
  import { settings } from '$lib/stores/settings.svelte';
  import { slide } from 'svelte/transition';

  import ButtonOption from './selectables/ButtonOption.svelte';
  import CheckboxOption from './selectables/CheckboxOption.svelte';
  import RangeOption from './selectables/RangeOption.svelte';

  const fonts = ['UbuntuMono', 'Lexend', 'Montserrat'];

  let display = $state(true);
  let arrow = $derived(display ? '˅' : '>');
  let fontIndex = $state(0);

  function fontButtonClick(index) {
    fontIndex = index;
    settings.font = fonts[index];
  }
</script>

{#key display}
  <button
    onclick={() => (display = !display)}
    class="text-lavender flex w-96 cursor-pointer self-center text-left">{arrow} overlay</button
  >
{/key}

{#if display}
  <div class="flex w-96 flex-col gap-0.5 self-center" transition:slide={{ duration: 250 }}>
    <span class="text-left">font</span>
    <div class="flex gap-1">
      {#each fonts as name, index}
        <ButtonOption
          {name}
          isFont={true}
          selected={index === fontIndex}
          onclick={() => fontButtonClick(index)}
        />
      {/each}
    </div>
    <RangeOption description={'hue'} bind:value={settings.hueRotate} />
    <CheckboxOption description={'use team colors'} bind:checked={settings.useTeamColors} />
    <CheckboxOption description={'use PRs'} bind:checked={settings.usePR} />
    <CheckboxOption description={'use single POV'} bind:checked={settings.useSinglePOV} />
    <CheckboxOption description={'use WebSocket timer'} bind:checked={settings.useWebSocket} />
  </div>
{/if}
