export const leftTimer = $state({
  timer_start: false,
  timer_stop: false,
  timer_finish: false,
  finishTime: 0,
  checkpointTimes: []
});

export const rightTimer = $state({
  timer_start: false,
  timer_stop: false,
  timer_finish: false,
  finishTime: 0,
  checkpointTimes: []
});

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
    leftTimer.timer_stop = true;
  } else if (side === 'right' && !rightTimer.timer_finish) {
    Object.assign(rightTimer, defaultTimer);
    rightTimer.timer_stop = true;
  }
}

export function timer_finish(side, finishTime) {
  if (side === 'left') {
    leftTimer.timer_start = false;
    leftTimer.timer_finish = true;
    leftTimer.finishTime = finishTime;
    leftTimer.checkpointTimes.push(finishTime);
  } else {
    rightTimer.timer_start = false;
    rightTimer.timer_finish = true;
    rightTimer.finishTime = finishTime;
    rightTimer.checkpointTimes.push(finishTime);
  }
}

export function timer_checkpoint(side, checkpointTime) {
  if (side === 'left') {
    leftTimer.checkpointTimes.push(checkpointTime);
    console.log(leftTimer.checkpointTimes);
  } else {
    rightTimer.checkpointTimes.push(checkpointTime);
  }
}

export function resetTimer(side) {
  if (side === 'left') {
    Object.assign(leftTimer, defaultTimer);
  } else {
    Object.assign(rightTimer, defaultTimer);
  }
}

export const resetPulse = $state({
  state: false
});

const defaultTimer = {
  timer_start: false,
  timer_stop: false,
  timer_finish: false,
  finishTime: 0,
  checkpointTimes: []
};
