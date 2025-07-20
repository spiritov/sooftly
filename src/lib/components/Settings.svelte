<script>
  import { settings } from '$lib/stores/settings.svelte';
  import ButtonOption from './ButtonOption.svelte';

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
    <div class="flex flex-row gap-1">
      <input
        class="checked:bg-lavender border-palewhite inset-ring-paleblack size-6 appearance-none self-center rounded-sm border-2 inset-ring-2 select-none"
        type="checkbox"
        checked={settings.enablePR}
      />
      <span>use PRs</span>
    </div>
    <div class="flex flex-row gap-1">
      <input
        class="checked:bg-lavender border-palewhite inset-ring-paleblack size-6 appearance-none self-center rounded-sm border-2 inset-ring-2 select-none"
        type="checkbox"
        checked={settings.enableWebSocket}
      />
      <span>use WebSocket timer</span>
    </div>
  </div>
{/if}
