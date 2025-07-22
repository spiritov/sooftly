<script>
  let { description, checked = $bindable() } = $props();
</script>

<div class="flex flex-row gap-1">
  <input
    class="checked:bg-lavender border-palewhite inset-ring-paleblack size-6 cursor-pointer appearance-none self-center rounded-sm border-2 inset-ring-2 select-none"
    type="checkbox"
    bind:checked
  />
  <span>{description}</span>
</div>
