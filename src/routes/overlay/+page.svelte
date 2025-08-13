<script>
  import { settings } from '$lib/stores/settings.svelte';
  import { websocketState } from '$lib/stores/websocket.svelte';
  import { browser } from '$app/environment';
  import { fade, slide } from 'svelte/transition';

  import WebSocketTimer from '$lib/components/overlay/WebSocketTimer.svelte';

  function resetWebSocketTimer() {
    websocketState.leftStart = false;
    websocketState.rightStart = false;
    websocketState.leftFinish = false;
    websocketState.rightFinish = false;
    websocketState.resetPulse = true;
  }

  function handleWebSocketData(data) {
    switch (data.type) {
      case 'timer_start':
        if (`${data.steamid}` === settings.leftName.steamid) {
          websocketState.leftFinish = false;
          websocketState.leftStart = true;
        } else if (`${data.steamid}` === settings.rightName.steamid) {
          websocketState.leftFinish = false;
          websocketState.rightStart = true;
        }
        break;
      // TODO: should i only care about timer_finish here if resets don't count?
      // case 'timer_stop':
      case 'timer_finish':
        if (`${data.steamid}` === settings.leftName.steamid) {
          websocketState.leftFinish = true;
          websocketState.leftFinishTime = Math.round(data.time * 100);
        } else if (`${data.steamid}` === settings.rightName.steamid) {
          websocketState.rightFinish = true;
          websocketState.rightFinishTime = Math.round(data.time * 100);
        }
        break;
      default: // typically a welcome event
        break;
    }
  }

  let bluGradient = $derived(
    `from-tf-blu ${!settings.useSinglePOV ? ' to-fullblack/60' : 'to-fullblack/0'} to-75%`
  );
  let redGradient = $derived(
    `from-tf-red ${!settings.useSinglePOV ? ' to-fullblack/60' : 'to-fullblack/0'} to-75%`
  );
  let leftGradient = $derived(
    `from-overlay-orange/90 ${!settings.useSinglePOV ? ' to-fullblack/60' : 'to-fullblack/0'} to-75% hue-rotate-${settings.hueRotate}`
  );
  let rightGradient = $derived(
    `from-overlay-orange/90 ${!settings.useSinglePOV ? ' to-fullblack/60' : 'to-fullblack/0'} to-75% hue-rotate-${settings.hueRotate}`
  );

  let wsConnected = $state(false);
  let ws;

  if (browser) {
    // update initial overlay from localStorage
    for (const [key, _] of Object.entries(settings)) {
      settings[key] = JSON.parse(localStorage.getItem(key));
    }

    window.addEventListener('storage', (event) => {
      settings[event.key] = JSON.parse(event.newValue);
    });

    $effect(() => {
      if (settings.useWebSocket && settings.useWebSocketToken !== '') {
        const token = settings.useWebSocketToken;

        // test connection
        // ws = new WebSocket('https://echo.websocket.org/.sse');

        // TF2PJ World Cup plugin connection
        ws = new WebSocket(`wss://flyio-silent-sea-6505.fly.dev/?token=${token}`);

        ws.onopen = (event) => {
          console.log('[WebSocket] connection opened.');
          wsConnected = true;
        };

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log('[WebSocket] received data..', data);

          handleWebSocketData(data);
        };
      }

      return () => {
        if (ws) {
          ws.close();
          console.log('[WebSocket] closed previous connection.');
          wsConnected = false;
        }
      };
    });

    if (settings.useWebSocket && settings.useWebSocketToken !== '') {
      $effect(() => {
        const leftName = settings.leftName;
        const rightName = settings.rightName;
        resetWebSocketTimer();
      });
    }
  }
</script>

<div class="font-{settings.font.toLowerCase()} flex h-screen w-screen flex-col overflow-hidden">
  <div class="relative flex h-32 w-full shrink-0">
    {#if settings.useWebSocket && settings.useWebSocketToken !== '' && settings.leftName.steamid && settings.rightName.steamid}
      <WebSocketTimer />
      {#if !wsConnected}
        <span in:fade class="absolute z-999 h-screen w-full bg-black/60 p-64 text-4xl"
          >WebSocket connecting...
          <span class="text-palewhite/60 text-3xl"
            >(if this takes more than a few seconds after setting the token, it's likely failed.)</span
          ></span
        >
      {:else}
        <span
          class="absolute z-999 h-screen w-full bg-black/60 p-64 text-4xl opacity-0 transition-opacity delay-1000 duration-1000 starting:opacity-100"
          >WebSocket connected.</span
        >
      {/if}
    {/if}
    {@render topBar('left')}
    {@render topBar('right')}
  </div>
  {#if !settings.useSinglePOV}
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
        ? `bg-linear-to-r/oklch ${settings.useTeamColors ? bluGradient : leftGradient}`
        : `bg-linear-to-l/oklch ${settings.useTeamColors ? redGradient : rightGradient}`}"
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
      {#if settings[side + 'Name']}
        {#key settings[side + 'Name']}
          <span in:fade>{settings[side + 'Name'].name}</span>
        {/key}
      {/if}
      <div class="flex gap-2 {side === 'left' ? 'flex-row' : 'flex-row-reverse'}">
        {#each { length: settings[side + 'Score'] }}
          <div
            class="starting:border-palewhite/50 starting:bg-overlay-orange/0 border-palewhite/50 bg-overlay-orange size-8 border-4 transition-colors duration-1000 {settings.useTeamColors
              ? ''
              : `hue-rotate-${settings.hueRotate}`}"
          ></div>
        {/each}
        {#each { length: settings.maxScore - settings[side + 'Score'] }}
          <div class="border-palewhite/50 size-8 border-4"></div>
        {/each}
        {#if settings.usePR}
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
