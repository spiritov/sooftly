<script>
  let { name, removable = true, selected = false, onclick = null } = $props();
</script>

<button
  class="font-{name.toLowerCase()} bg-lavender text-paleblack hover:bg-lavender border-darklavender w-fit rounded-md border-b-2 px-2 hover:cursor-pointer {selected
    ? 'brightness-100'
    : 'brightness-50'}"
  {onclick}>{name}</button
>
