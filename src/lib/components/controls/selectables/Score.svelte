<script>
  let { side } = $props();
  let score = $derived(side + 'Score');
  import { settings } from '$lib/stores/settings.svelte';

  function setScore(newScore) {
    settings[score] =
      newScore <= 0 ? 0 : newScore > settings.maxScore ? settings.maxScore : newScore;
  }
</script>

<div class="flex w-fit overflow-hidden rounded-md">
  <button class="button text-xl brightness-50" onclick={() => setScore(settings[score] + 1)}
    >+</button
  >
  {#key settings[score]}
    <div class="button brightness-100">{settings[score]}</div>
  {/key}
  <button class="button text-xl brightness-50" onclick={() => setScore(settings[score] - 1)}
    >-</button
  >
</div>

<style lang="postcss">
  @reference '$lib/css/app.css';

  .button {
    @apply bg-lavender text-paleblack hover:bg-lavender border-darklavender flex size-8 items-center justify-center border-b-2 transition-all hover:cursor-pointer hover:brightness-100;
  }
</style>
