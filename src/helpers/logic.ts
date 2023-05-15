import type { ArrayElement } from "../types";
import { bubbleSort } from "./sortAlgoritmhs";

let audioCtx: AudioContext = null;

export const playNote = (frequency: number) => {
  if (audioCtx === null) {
    audioCtx = new AudioContext();
  }
  const dur = 0.1;
  const osc = audioCtx.createOscillator();
  osc.frequency.value = frequency;
  osc.start();
  osc.stop(audioCtx.currentTime + dur);
  const node = audioCtx.createGain();
  node.gain.value = 0.1;
  node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur);
  osc.connect(node);
  node.connect(audioCtx.destination);
}

export function init(numberOfElements: number): ArrayElement[] {
  return generateArray(numberOfElements).map((el) => ({
    value: el,
    type: 'unsorted',
  }));
}

function generateArray(numberOfElements: number): number[] {
  return Array.from({ length: numberOfElements }, () => Math.floor(Math.random() * 100));
}

export function setFrequency(numberOfElements: number): number {
  if (numberOfElements <= 10) {
    return 800;
  } else if (numberOfElements <= 20) {
    return 500;
  } else {
    return 100;
  }
}

export function playAlgotimh(
  state: ArrayElement[],
  elementsSlider: number,
  speedSlider: number,
  frecuency: number,
  updateState: (state: ArrayElement[]) => void,
  playNote: (frequency: number) => void,
  updateInterval: (interval: any) => void
) {
  const moves = bubbleSort(state);

  const interval = setInterval(() => {
    const move = moves.shift();
    if (move) {
      state = [...move];
      updateState(state);
      playNote(frecuency);
      if (frecuency < 1200) frecuency += 1;
      else {
        frecuency = setFrequency(elementsSlider);
      }
    } else {
      clearInterval(interval);
      state = state.map((item) => ({ ...item, type: "sorted" }));
      updateState(state);
    }
  }, speedSlider);
  updateInterval(interval);
}