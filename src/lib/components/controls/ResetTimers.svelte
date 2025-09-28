<script>
  import { settings } from '$lib/stores/settings.svelte';
  import ButtonOption from './selectables/ButtonOption.svelte';
</script>

<div class="relative flex w-96 justify-center gap-1">
  <ButtonOption name={'reset timers (untested)'} onclick={(settings.resetPulse = true)} />
</div>
