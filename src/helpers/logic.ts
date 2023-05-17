import type { Algorithm, AlgorithmStep, ArrayElement } from "../types";
import { bubbleSort, insertionSort, selectionSort } from "./sortAlgoritmhs";
import confetti from "canvas-confetti";
import {Howl} from 'howler';

let audioCtx: AudioContext = null;
const soundOptions = {
  src: ['finish-sound.mp3'],
  volume: 0.3,
}


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
  algorithm: Algorithm,
  state: ArrayElement[],
  elementsSlider: number,
  speedSlider: number,
  frecuency: number,
  updateState: (state: ArrayElement[]) => void,
  playNote: (frequency: number) => void,
  updateInterval: (interval: any) => void,
  setActualState: (state: ArrayElement[]) => void
) {
  let moves = null;
  if (algorithm === "bubble") {
    moves = bubbleSort(state);
  } else if (algorithm === "selection"){
    moves = selectionSort(state);
  } else if (algorithm === "insertion"){
    moves = insertionSort(state);
  }

  const interval = setInterval(() => {
    const move = moves.shift();
    if (move) {
      state = [...move];
      updateState(state);
      setActualState(state);
      playNote(frecuency);
      if (frecuency < 1200) frecuency += 1;
      else {
        frecuency = setFrequency(elementsSlider);
      }
    } else {
      clearInterval(interval);
      setActualState(null)
      state = state.map((item) => ({ ...item, type: "sorted" }));
      updateState(state);
      setActualState(state);
      confetti();
      
      new Howl(soundOptions).play();
    }
  }, speedSlider);
  updateInterval(interval);
}

export const clearState = (state: ArrayElement[]): ArrayElement[] => {
  return state.map((item) => ({ ...item, type: "unsorted" }));
}

export const getAction = (state: ArrayElement[]) => {
  if (!state || state.length === state.filter(s => s.type === "sorted").length) return {action: "end", firstIndex: null, secondIndex: null};

  let foundedFirstAction = false;
  let foundedSecondAction = false;
  let firstIndex = null;
  let secondIndex = null;
  let action: string = null;
  
  let i = 0;
  while (!foundedFirstAction && i < state.length) {
    if (state[i].type === "compare") {
      foundedFirstAction = true;
      action = "comparing";
      firstIndex = i;
    } else if (state[i].type === "swap") {
      foundedFirstAction = true;
      action = "swaping";
      firstIndex = i;
    } else if (state[i].type === "sorted") {
      foundedFirstAction = true;
      action = "sorted";
      firstIndex = i;
    }
    i++;
  }

  while (!foundedSecondAction && i < state.length) {
    if (state[i].type === "compare") {
      foundedSecondAction = true;
      secondIndex = i;
    } else if (state[i].type === "swap") {
      foundedSecondAction = true;
      secondIndex = i;
    } else if (state[i].type === "sorted") {
      foundedSecondAction = true;
      secondIndex = i;
    }
    i++;
  }

  if (!foundedFirstAction && !foundedSecondAction) {
    action = "sorted";
  }

  return { action, firstIndex, secondIndex };
  
}