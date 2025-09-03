import { SvelteMap } from 'svelte/reactivity';

export const defaultSettings = {
  font: 'Lexend',
  usePR: true,
  useTeamColors: false,
  useSinglePOV: false,
  useWebSocket: false,
  useWebSocketToken: '',
  hueRotate: 0,
  bestOf: 3,
  maxScore: 2,
  leftName: '',
  rightName: '',
  leftFlag: '',
  rightFlag: '',
  leftPR: '',
  rightPR: '',
  leftScore: 0,
  rightScore: 0,
  map: '',
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
  ['team', []],
  ['map', []],
  ['stage', defaultStages]
]);

export const settings = $state({
  font: 'Lexend',
  usePR: true,
  useTeamColors: false,
  useTeams: false,
  useSinglePOV: false,
  useWebSocket: false,
  useWebSocketToken: '',
  hueRotate: 0,
  bestOf: 3,
  maxScore: 2,
  leftName: '',
  rightName: '',
  leftFlag: '',
  rightFlag: '',
  leftTeam: '',
  rightTeam: '',
  leftPR: '',
  rightPR: '',
  leftScore: 0,
  rightScore: 0,
  map: '',
  stage: ''
});
