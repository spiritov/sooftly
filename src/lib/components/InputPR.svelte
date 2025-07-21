<script>
  let { onkeypress } = $props();
</script>

<div class="relative">
  <span class="absolute left-10">PR </span>
  <input
    class="bg-grey border-b-palegrey focus:border-b-lavender hover:bg-palegrey h-8 rounded-md border-b-2 px-1 ring-0 outline-none"
    type="text"
    {onkeypress}
  />
</div>
