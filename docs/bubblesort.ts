function bubbleSort(listToSort: number[]) {
  let swapped;
  do {
      swapped = false;
      for (let i = 0; i < listToSort.length - 1; i++) {
          if (listToSort[i] > listToSort[i + 1]) {
            [listToSort[i], listToSort[i + 1]] = [listToSort[i + 1], listToSort[i]]              
            swapped = true;
          } else {
          }
      }
  } while (swapped);
};