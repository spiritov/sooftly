<script>
  import { settings } from '$lib/stores/settings.svelte';
  import { browser } from '$app/environment';
  import { fade, slide } from 'svelte/transition';

  let bluGradient = $derived(
    `from-tf-blu ${settings.useSinglePOV !== 'true' ? ' to-fullblack/60' : 'to-fullblack/0'} to-75%`
  );
  let redGradient = $derived(
    `from-tf-red ${settings.useSinglePOV !== 'true' ? ' to-fullblack/60' : 'to-fullblack/0'} to-75%`
  );
  let leftGradient = $derived(
    `from-overlay-orange/90 ${settings.useSinglePOV !== 'true' ? ' to-fullblack/60' : 'to-fullblack/0'} to-75% hue-rotate-${settings.hueRotate}`
  );
  let rightGradient = $derived(
    `from-overlay-orange/90 ${settings.useSinglePOV !== 'true' ? ' to-fullblack/60' : 'to-fullblack/0'} to-75% hue-rotate-${settings.hueRotate}`
  );

  let ws;

  if (browser) {
    window.addEventListener('storage', (event) => {
      settings[event.key] = event.newValue;
    });

    $effect(() => {
      if (settings.useWebSocket === 'true' && settings.useWebSocketToken !== '') {
        const token = settings.useWebSocketToken;

        // test connection
        // ws = new WebSocket('https://echo.websocket.org/.sse');

        // TF2PJ World Cup plugin connection
        ws = new WebSocket(`wss://flyio-silent-sea-6505.fly.dev/?token=${token}`);

        ws.onopen = (event) => {
          console.log('[WebSocket] connection opened.');
        };

        ws.onmessage = (event) => {
          console.log('[WebSocket] received data..', event.data);
        };
      }

      return () => {
        if (ws) {
          ws.close();
          console.log('[Websocket] closed previous connection.');
        }
      };
    });
  }
</script>

<div class="font-{settings.font.toLowerCase()} flex h-screen w-screen flex-col overflow-hidden">
  <div class="flex h-32 w-full">
    {@render topBar('left')}
    {@render topBar('right')}
  </div>
  {#if settings.useSinglePOV !== 'true'}
    {@render POVs()}
  {/if}
  {@render stageAndMap()}
</div>

{#snippet topBar(side)}
  <div
    class="relative flex basis-1/2 items-center gap-4 {side === 'left'
      ? 'flex-row text-left'
      : 'flex-row-reverse text-right'}"
  >
    <div
      class="absolute -z-10 h-full w-full {side === 'left'
        ? `bg-linear-to-r/oklch ${settings.useTeamColors === 'true' ? bluGradient : leftGradient}`
        : `bg-linear-to-l/oklch ${settings.useTeamColors === 'true' ? redGradient : rightGradient}`}"
    ></div>
    <div id="spacer"></div>
    {#if settings[side + 'Flag']}
      <img
        class="relative z-50 flex h-24 w-fit rounded-lg"
        src="https://countryflagsapi.netlify.app/flag/{settings[side + 'Flag']}.svg"
        alt="flag"
      />
    {/if}
    <div class="flex flex-col gap-2 text-5xl">
      {#key settings[side + 'Name']}
        <span in:fade>{JSON.parse(settings[side + 'Name']).name}</span>
      {/key}
      <div class="flex gap-2 {side === 'left' ? 'flex-row' : 'flex-row-reverse'}">
        {#each { length: settings[side + 'Score'] }}
          <div
            class="starting:border-palewhite/50 starting:bg-overlay-orange/0 border-palewhite/50 bg-overlay-orange size-8 border-4 transition-colors duration-1000 {settings.useTeamColors ===
            'true'
              ? ''
              : `hue-rotate-${settings.hueRotate}`}"
          ></div>
        {/each}
        {#each { length: settings.maxScore - settings[side + 'Score'] }}
          <div class="border-palewhite/50 size-8 border-4"></div>
        {/each}
        {#if settings.usePR === 'true' || settings.usePR}
          <span class="relative bottom-0.5 text-3xl opacity-50">PR {settings[side + 'PR']}</span>
        {/if}
      </div>
    </div>
  </div>
{/snippet}

{#snippet POVs()}
  <div transition:slide class="bg-palewhite/50 flex h-[540px] w-full">
    {#each { length: 2 }}
      <div
        class="flex basis-1/2 items-center justify-center border-white text-3xl first:border-r-[1px]"
      >
        960x540px
      </div>
    {/each}
  </div>
{/snippet}

{#snippet stageAndMap()}
  <div class="flex h-16 w-full justify-between text-3xl">
    {#if settings.stage}
      <div
        class="bg-fullblack/90 border-palewhite/50 relative right-8 min-w-64 skew-x-[-30deg] rounded-br-xl border-r-4 border-b-4 px-12"
      >
        {#key settings.stage}
          <span
            in:fade
            class="relative left-2 flex w-full skew-x-[30deg] items-center justify-center py-3"
            >{settings.stage}</span
          >
        {/key}
      </div>
    {/if}
    {#if settings.map}
      <div
        class="bg-fullblack/90 border-palewhite/50 relative left-8 ml-auto min-w-64 skew-x-[30deg] rounded-bl-xl border-b-4 border-l-4 px-12"
      >
        {#key settings.map}
          <span in:fade class="relative right-2 flex w-full skew-x-[-30deg] justify-center py-3"
            >{settings.map}</span
          >
        {/key}
      </div>
    {/if}
  </div>
{/snippet}
