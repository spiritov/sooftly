<script>
  import { slide } from 'svelte/transition';

  let { description, value = $bindable() } = $props();
</script>

<div transition:slide={{ duration: 250 }} class="flex flex-col">
  <span class="w-full text-left">hue rotation</span>
  <div class="flex items-center gap-1">
    <div
      class="bg-overlay-orange hue-rotate-{value} border-palewhite inset-ring-paleblack size-6 rounded-sm border-2 inset-ring-2 transition-colors select-none"
    ></div>
    <span class="w-10">{value}°</span>
    <input
      class=" accent-lavender bg-grey h-2 w-64 cursor-pointer appearance-none rounded-full"
      type="range"
      bind:value
      min="0"
      max="360"
      step="10"
    />
  </div>
</div>
