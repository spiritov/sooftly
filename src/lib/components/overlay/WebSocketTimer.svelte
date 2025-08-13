<script>
  import { websocketState } from '$lib/stores/websocket.svelte';

  let leftDs = $state(0);
  let rightDs = $state(0);
  let leftTime = $derived(csToTime(leftDs));
  let rightTime = $derived(csToTime(rightDs));

  // for finish (and stopwatch..?) time
  function csToTime(cs) {
    const minutes = Math.floor(cs / 6000)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor((cs / 100) % 60)
      .toString()
      .padStart(2, '0');
    const centiseconds = Math.floor(cs % 100)
      .toString()
      .padStart(2, '0');

    return `${minutes}:${seconds}.${centiseconds}`;
  }

  // for stopwatch time
  function dsToTime(ds) {
    const minutes = Math.floor(ds / 600)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor((ds / 10) % 60)
      .toString()
      .padStart(2, '0');
    const deciseconds = Math.floor(ds % 10)
      .toString()
      .padStart(2, '0');

    return `${minutes}:${seconds}.${deciseconds}`;
  }

  $effect(() => {
    // run is ongoing
    if (websocketState.leftStart && !websocketState.leftFinish) {
      const startDate = Math.floor(Date.now() / 10);
      const leftTimer = setInterval(() => {
        leftDs = Math.floor(Date.now() / 10 - startDate);
      }, 77);

      return () => {
        clearInterval(leftTimer);
      };
    }
  });

  $effect(() => {
    // run is ongoing
    if (websocketState.rightStart && !websocketState.rightFinish) {
      const startDate = Date.now() / 10;
      const rightTimer = setInterval(() => {
        rightDs = Math.floor(Date.now() / 10 - startDate);
      }, 77);

      return () => {
        clearInterval(rightTimer);
      };
    }
  });

  $effect(() => {
    if (websocketState.resetPulse) {
      leftDs = 0;
      rightDs = 0;
      websocketState.resetPulse = false;
    }
  });
</script>

<div class="absolute flex h-32 w-full items-center justify-center gap-36">
  {#key [websocketState.leftStart, websocketState.leftFinish]}
    <span
      class="{!websocketState.leftStart
        ? 'text-palewhite/50'
        : 'text-palewhite'} font-chivomono text-center text-5xl transition-colors duration-2000"
      >{!websocketState.leftFinish ? leftTime : csToTime(websocketState.leftFinishTime)}</span
    >
  {/key}
  {#key [websocketState.rightStart, websocketState.rightFinish]}
    <span
      class="{!websocketState.rightStart
        ? 'text-palewhite/50'
        : 'text-palewhite'} font-chivomono text-center text-5xl transition-colors duration-2000"
      >{!websocketState.rightFinish ? rightTime : csToTime(websocketState.rightFinishTime)}</span
    >
  {/key}
</div>
