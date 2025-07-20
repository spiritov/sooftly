<script>
  import { settings } from '$lib/stores/settings.svelte';
  import ButtonOption from './ButtonOption.svelte';
  import CheckboxOption from './CheckboxOption.svelte';

  const fonts = ['UbuntuMono', 'Lexend', 'Montserrat'];

  let display = $state(true);
  let arrow = $derived(display ? '˅' : '>');
  let fontIndex = $state(0);

  function fontButtonClick(index) {
    fontIndex = index;
  }
</script>

{#key display}
  <button
    onclick={() => (display = !display)}
    class="flex w-96 cursor-pointer self-center text-left">{arrow} overlay settings</button
  >
{/key}

{#if display}
  <div class="flex w-96 flex-col gap-0.5 self-center">
    <div class="flex gap-1">
      {#each fonts as name, index}
        <ButtonOption
          {name}
          removable={false}
          selected={index === fontIndex}
          onclick={() => fontButtonClick(index)}
        />
      {/each}
    </div>
    <CheckboxOption option={settings.enablePR} description={'use PRs'} />
    <CheckboxOption option={settings.enableSinglePOV} description={'use single POV'} />
    <CheckboxOption option={settings.enableWebSocket} description={'use WebSocket timer'} />
  </div>
{/if}
