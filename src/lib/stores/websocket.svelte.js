import { SvelteMap } from 'svelte/reactivity';

export const leftTimer = $state({
  timer_start: false,
  timer_stop: false,
  timer_finish: false,
  finishTime: 0
});

export const rightTimer = $state({
  timer_start: false,
  timer_stop: false,
  timer_finish: false,
  finishTime: 0
});

// cannot use with defaultTimer
export const leftCheckpointTimes = new SvelteMap([]);
export const rightCheckpointTimes = new SvelteMap([]);

// don't start timer if already finished
export function timer_start(side) {
  if (side === 'left' && !leftTimer.timer_finish) {
    Object.assign(leftTimer, defaultTimer);
    leftTimer.timer_start = true;
  } else if (side === 'right' && !rightTimer.timer_finish) {
    Object.assign(rightTimer, defaultTimer);
    rightTimer.timer_start = true;
  }
}

// don't stop timer if already finished
export function timer_stop(side) {
  if (side === 'left' && !leftTimer.timer_finish) {
    Object.assign(leftTimer, defaultTimer);
    leftCheckpointTimes.clear();
    leftTimer.timer_stop = true;
  } else if (side === 'right' && !rightTimer.timer_finish) {
    Object.assign(rightTimer, defaultTimer);
    leftCheckpointTimes.clear();
    rightTimer.timer_stop = true;
  }
}

export function timer_finish(side, finishTime) {
  if (side === 'left') {
    leftTimer.timer_start = false;
    leftTimer.timer_finish = true;
    leftTimer.finishTime = finishTime;
    leftCheckpointTimes.set('finish', finishTime);
  } else {
    rightTimer.timer_start = false;
    rightTimer.timer_finish = true;
    rightTimer.finishTime = finishTime;
    rightCheckpointTimes.set('finish', finishTime);
  }
}

export function timer_checkpoint(side, checkpointName, checkpointTime) {
  if (side === 'left') {
    leftCheckpointTimes.set(checkpointName, checkpointTime);
  } else {
    rightCheckpointTimes.set(checkpointName, checkpointTime);
  }
}

export function resetTimer(side) {
  if (side === 'left') {
    Object.assign(leftTimer, defaultTimer);
    leftCheckpointTimes.clear();
  } else {
    Object.assign(rightTimer, defaultTimer);
    rightCheckpointTimes.clear();
  }
}

export const resetPulse = $state({
  state: false
});

const defaultTimer = {
  timer_start: false,
  timer_stop: false,
  timer_finish: false,
  finishTime: 0
};

export function csToTime(cs) {
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
