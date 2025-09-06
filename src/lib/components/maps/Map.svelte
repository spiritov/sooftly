<script>
  import { browser } from '$app/environment';

  let { map, colspan = 2, picked = false, banned = false } = $props();

  document.addEventListener('keypress', (e) => {
    if (e.key === 'r') {
      e.preventDefault();
      picked = false;
      banned = false;
    }
  });
</script>

<button
  class="relative z-20 flex w-full cursor-pointer justify-center overflow-hidden border-4 bg-black/50 bg-cover bg-clip-padding bg-center transition-colors duration-1000
      {picked ? 'border-cat-green' : banned ? 'border-cat-red' : 'border-palewhite/75'} 
      col-span-{colspan}"
  style="background-image: url('https://wfzq.github.io/Tempus-Tracker/src/data/thumbnails/{map}.jpg')"
  onclick={() => {
    picked = !picked;
    banned = false;
  }}
  oncontextmenu={(e) => {
    e.preventDefault();
    picked = false;
    banned = !banned;
  }}
>
  <span
    class="absolute z-30 flex w-full justify-center bg-gradient-to-b from-75% to-black/0 pt-4 pb-8 transition-colors duration-1000 {picked
      ? 'from-black/50'
      : banned
        ? 'from-black-0 text-palewhite/50'
        : 'from-black/75'}">{map}</span
  >
  <div
    class="absolute h-full w-full {picked
      ? 'bg-cat-green/25'
      : banned
        ? 'bg-cat-red/25'
        : ''} transition-colors duration-1000"
  ></div>
</button>
