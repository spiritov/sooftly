<script>
  import InputRemoveButton from './InputRemoveButton.svelte';

  let { category, onkeypress = null } = $props();
  let isFlag = $derived(category === 'flag');
</script>

<div class="relative flex w-96 justify-center">
  {#if isFlag}
    <a
      class="hover:text-lavender absolute left-0 flex gap-1"
      href="https://countryflagsapi.netlify.app/country-list"
      target="_blank"
    >
      <span>add {category}</span>
      <span class="self-center">{@render icon_link()}</span>
    </a>
  {:else}
    <span class="absolute left-0 flex">add {category}</span>
  {/if}
  <input type="text" placeholder={isFlag ? 'alpha-2 code' : ''} {onkeypress} />
  <InputRemoveButton {category} />
</div>

{#snippet icon_link()}
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
    ><g
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      ><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path
        d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
      /></g
    ></svg
  >
{/snippet}
