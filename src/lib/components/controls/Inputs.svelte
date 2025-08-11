<script>
  import { categories, settings } from '$lib/stores/settings.svelte';
  import InputCategory from './inputs/InputCategory.svelte';
  import { slide } from 'svelte/transition';

  let display = $state(true);
  let arrow = $derived(display ? '˅' : '>');

  function inputKeypress(event, category) {
    const inputValue = event.target.value;
    if (event.key === 'Enter' && inputValue.length > 0) {
      const values = categories.get(category);

      // prompt for steamID to link a player with WebSocket responses
      if (category === 'name') {
        if (settings.useWebSocket && settings.useWebSocketToken !== '') {
          const regex = /^\d+$/;
          const steamID3 = prompt(`ID portion of ${inputValue}'s steamID3
retrievable from https://steamid.uk/
ex [U:1:123456789] -> 123456789`);
          if (regex.test(steamID3)) {
            categories.set('name', values.concat([{ name: inputValue, steamid: steamID3 }]));
          }
        } else {
          // not using WebSocket
          categories.set('name', values.concat([{ name: inputValue }]));
        }
      } else if (category === 'flag' && inputValue.length === 2) {
        categories.set('flag', values.concat([inputValue.toUpperCase()]));
        event.target.value = '';
      } else {
        categories.set(category, values.concat([inputValue]));
        event.target.value = '';
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
      <InputCategory {category} onkeypress={(event) => inputKeypress(event, category)} />
    {/each}
  </div>
{/if}
