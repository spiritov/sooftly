<script>
  import { settings } from '$lib/stores/settings.svelte';
  import { slide } from 'svelte/transition';
  import ButtonOption from './ButtonOption.svelte';

  let { description, WebSocket = false, checked = $bindable() } = $props();
  let token = $state('');
</script>

<div class="flex flex-row flex-wrap gap-1" transition:slide={{ duration: 250 }}>
  <input
    class="checked:bg-lavender border-palewhite inset-ring-paleblack size-6 cursor-pointer appearance-none self-center rounded-sm border-2 inset-ring-2 transition-colors select-none"
    type="checkbox"
    bind:checked
  />
  <span>{description}</span>
  {#if WebSocket && settings.useWebSocket}
    <div class="flex flex-wrap" transition:slide={{ duration: 250 }}>
      <input type="text" placeholder="token" bind:value={token} />
      <ButtonOption
        name={'set'}
        selected={settings.useWebSocketToken !== ''}
        onclick={() => {
          settings.useWebSocketToken = token;
        }}
      />
      <div class="w-full"></div>
      <span class="text-palewhite/75 rounded-md bg-black px-1"
        >token: {settings.useWebSocketToken}</span
      >
    </div>
  {/if}
</div>
