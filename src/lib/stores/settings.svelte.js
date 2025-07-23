import { SvelteMap } from 'svelte/reactivity';

export const defaultSettings = {
  font: 'UbuntuMono',
  usePR: true,
  useTeamColors: false,
  useSinglePOV: false,
  useWebSocket: false,
  useWebSocketToken: '',
  hueRotate: 0,
  bestOf: 3,
  leftName: '',
  rightName: '',
  leftFlag: '',
  rightFlag: '',
  leftPR: '',
  rightPR: '',
  leftScore: '',
  rightScore: '',
  stage: ''
};

export const defaultStages = [
  'Round 1',
  'Round 2',
  'Quarterfinals',
  'Semifinals',
  'Finals',
  'Grand Finals',
  "Loser's Quarters",
  "Loser's Semis",
  "Loser's Finals"
];

export const categories = new SvelteMap([
  ['name', []],
  ['flag', []],
  ['map', []],
  ['stage', defaultStages]
]);

export const settings = $state({
  font: 'UbuntuMono',
  usePR: true,
  useTeamColors: false,
  useSinglePOV: false,
  useWebSocket: false,
  hueRotate: 0,
  bestOf: 3,
  leftName: '',
  rightName: '',
  leftFlag: '',
  rightFlag: '',
  leftPR: '',
  rightPR: '',
  leftScore: '',
  rightScore: '',
  stage: ''
});
