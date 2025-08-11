<script>
  import { fade } from 'svelte/transition';

  let {
    name,
    withFlag = false,
    withSteamID = '',
    isFont = false,
    isBestOf = false,
    selected = false,
    onclick = null,
    oncontextmenu = null
  } = $props();
</script>

<button
  class="{isFont ? `font-${name.toLowerCase()}` : ''}
    {isBestOf ? 'px-3' : 'px-2'}
    {selected
    ? 'brightness-100'
    : 'brightness-50 hover:brightness-100'} bg-lavender text-paleblack hover:bg-lavender border-darklavender flex w-fit rounded-md border-b-2 transition-all hover:cursor-pointer"
  {onclick}
  {oncontextmenu}
  in:fade
  >{name}
  {#if withSteamID}{@render steamIcon()}{/if}
  {#if withFlag}{@render flag(name)}{/if}
</button>

{#snippet flag(id)}
  <img
    class="ml-1 flex h-6 self-center"
    src="https://countryflagsapi.netlify.app/flag/{name}.svg"
    alt=""
  />
{/snippet}

{#snippet steamIcon()}
  <a
    class="flex h-6 self-center"
    href="https://steamcommunity.com/profiles/[U:1:{withSteamID}]"
    target="_blank"
  >
    <img class="ml-1 h-6" src="https://i.imgur.com/sf1ckIB.png" alt="" />
  </a>
{/snippet}
