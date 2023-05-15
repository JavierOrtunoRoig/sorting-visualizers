import type { ArrayElement } from "../types";

const addState = (state, array, type, firstIndex, secondIndex) => {
  const copyForState = structuredClone(array);
  copyForState[firstIndex].type = type;
  copyForState[secondIndex].type = type;
  state.push(copyForState);
}

export const bubbleSort = (inputArr: ArrayElement[]) => {
  let swapped;
  const state = [];
  do {
    swapped = false;
    for (let i = 0; i < inputArr.length - 1; i++) {
      addState(state, inputArr, 'compare', i, i + 1);
      if (inputArr[i].value > inputArr[i + 1].value) {
        [inputArr[i], inputArr[i + 1]] = [inputArr[i + 1], inputArr[i]]
        addState(state, inputArr, 'swap', i, i + 1);
        swapped = true;
      } else {
        addState(state, inputArr, 'sorted', i, i + 1);
      }
    }
  } while (swapped);
  return state;
};

export const selectionSort = (arr: ArrayElement[]) => {
  const state = [];
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      addState(state, arr, 'compare', min, j);
      if (arr[j].value < arr[min].value) {
        min = j;
      }
    }
    [arr[min], arr[i]] = [arr[i], arr[min]]
    addState(state, arr, 'swap', i, min);
  }
  return state;
}