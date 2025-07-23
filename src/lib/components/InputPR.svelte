<script>
  import { slide } from 'svelte/transition';

  let { value = $bindable() } = $props();
</script>

<div transition:slide={{ duration: 250 }} class="relative">
  <span class="absolute left-18">PR </span>
  <input class="w-32" type="text" bind:value />
</div>
