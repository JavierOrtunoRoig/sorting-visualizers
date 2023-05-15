export const bubbleSort = (inputArr) => {
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

const addState = (state, array, type, firstIndex, secondIndex) => {
  const copyForState = structuredClone(array);
  copyForState[firstIndex].type = type;
  copyForState[secondIndex].type = type;
  state.push(copyForState);
}