import { SvelteMap } from 'svelte/reactivity';

export const categories = new SvelteMap([
  ['name', []],
  ['flag', []],
  ['map', []],
  [
    'stage',
    [
      'Round 1',
      'Round 2',
      'Quarterfinals',
      'Semifinals',
      'Finals',
      'Grand Finals',
      "Loser's Quarters",
      "Loser's Semis",
      "Loser's Finals"
    ]
  ]
]);

export const settings = $state({
  font: 'UbuntuMono',
  enablePR: true,
  enableSinglePOV: false,
  enableWebSocket: false
});
