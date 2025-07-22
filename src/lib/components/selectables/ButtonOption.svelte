<script>
  let {
    name,
    withFlag = false,
    isFont = false,
    isBestOf = false,
    selected = false,
    removable = false,
    onclick = null
  } = $props();
</script>

<button
  class="{isFont ? `font-${name.toLowerCase()}` : ''}
    {isBestOf
    ? 'px-3'
    : 'px-2'} bg-lavender text-paleblack hover:bg-lavender border-darklavender flex w-fit rounded-md border-b-2 hover:cursor-pointer {selected
    ? 'brightness-100'
    : 'brightness-50'}"
  {onclick}
  >{name}
  {#if withFlag}{@render flag(name)}{/if}</button
>

{#snippet flag(id)}
  <img
    class="ml-1 flex h-6 self-center"
    src="https://countryflagsapi.netlify.app/flag/{name}.svg"
    alt=""
  />
{/snippet}
