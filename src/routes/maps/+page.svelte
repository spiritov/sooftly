<script>
  import { settings, categories } from '$lib/stores/settings.svelte';
  import { browser } from '$app/environment';

  let maps = $derived(categories.get('saved_maps'));
  if (browser) {
    // update initial maps from localStorage
    const savedValues = JSON.parse(localStorage.getItem(`saved_maps`));
    if (savedValues) {
      categories.set('saved_maps', savedValues);
    }

    window.addEventListener('storage', (event) => {
      if (event.key === 'saved_maps') {
        categories.set(event.key, JSON.parse(event.newValue));
      }
    });

    // update initial settings from localStorage (font only..)
    for (const [key, _] of Object.entries(settings)) {
      settings[key] = JSON.parse(localStorage.getItem(key));
    }

    window.addEventListener('storage', (event) => {
      settings[event.key] = JSON.parse(event.newValue);
    });
  }
</script>

{#each maps as map}
  <span class="text-5xl text-black font-{settings.font.toLowerCase()}">{map}</span>
{/each}
