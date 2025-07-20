<script>
  import { categories } from '$lib/stores/settings.svelte';

  let category = $props();
</script>

<button class="hover:text-salmon absolute right-0 hover:cursor-pointer">remove all</button>
