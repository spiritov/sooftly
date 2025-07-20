<script>
  let { option, description } = $props();
</script>

<div class="flex flex-row gap-1">
  <input
    class="checked:bg-lavender border-palewhite inset-ring-paleblack size-6 appearance-none self-center rounded-sm border-2 inset-ring-2 select-none"
    type="checkbox"
    checked={option}
  />
  <span>{description}</span>
</div>
