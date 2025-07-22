<script>
  let { value = $bindable() } = $props();
</script>

<div class="relative">
  <span class="absolute left-18">PR </span>
  <input
    class="bg-grey border-b-palegrey focus:border-b-lavender hover:bg-palegrey h-8 w-32 rounded-md border-b-2 px-1 ring-0 transition-all outline-none"
    type="text"
    bind:value
  />
</div>
