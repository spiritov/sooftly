<script>
  import { settings, categories } from '$lib/stores/settings.svelte';
  import { browser } from '$app/environment';
  let maps = $derived(categories.get('saved_maps'));
  maps = [];
  let rows = $derived(getRows());
  let cols = $derived(Math.ceil(maps.length / rows));
  let overflow = $derived(maps.length % cols);

  function getRows() {
    switch (true) {
      case maps.length <= 2:
        return 1;
      case maps.length <= 6:
        return 2;
      case maps.length <= 9:
        return 3;
      case maps.length <= 12:
        return 4;
      case maps.length <= 15:
        return 5;
      default:
        return 6;
    }
  }

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

  // tailwind safelist
  // grid-rows-1 grid-rows-2 grid-rows-3 grid-rows-4 grid-rows-5 grid-rows-6 grid-rows-7 grid-rows-8 grid-rows-9 grid-rows-10 grid-rows-11 grid-rows-12
  // grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8 grid-cols-9 grid-cols-10 grid-cols-11 grid-cols-12
  // col-span-1 col-span-2 col-span-3 col-span-4 col-span-5 col-span-6 col-span-7 col-span-8 col-span-9 col-span-10 col-span-11 col-span-12
</script>

<div
  class="grid grid-cols-{cols *
    2} grid-rows-{rows} h-screen w-full gap-4 p-4 font-{settings.font.toLowerCase()} text-3xl"
>
  {#each maps as map, i}
    <div
      class="border-palewhite/70 )} relative z-20 flex w-full justify-center overflow-hidden border-4 bg-black/50 bg-cover bg-clip-padding bg-center {maps.length -
        i >
      overflow
        ? 'col-span-2'
        : `col-span-${Number.parseInt((cols * 2) / overflow)}`}"
      style="background-image: url('https://wfzq.github.io/Tempus-Tracker/src/data/thumbnails/{map}.jpg')"
    >
      <span
        class="absolute z-30 flex w-full justify-center bg-gradient-to-b from-black/75 from-75% to-black/0 pt-4 pb-8"
        >{map}</span
      >
    </div>
  {/each}
</div>
