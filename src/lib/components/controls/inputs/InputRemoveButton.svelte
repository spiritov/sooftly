<script>
  import { categories } from '$lib/stores/settings.svelte';

  let { category } = $props();

  function onclick() {
    categories.set(category, []);
  }
</script>

<button
  class=" hover:text-salmon absolute right-0 brightness-50 transition-all hover:cursor-pointer hover:underline hover:brightness-100"
  {onclick}>remove all</button
>
