# Sorting Visualizer

In this project, I have created a sorting visualizer using **Svelte**. It is important to understand how sorting algorithms work and how they are implemented. It is also important for a developer to know how to visualize the sorting algorithms. This project is a part of my journey to learn **Svelte**.

## How to run the project

To run the project, you need to have **Node.js** installed on your machine. If you don't have it, you can download it from [here](https://nodejs.org/en/). After installing **Node.js**, you can run the following commands to run the project:

```bash
git clone https://github.com/JavierOrtunoRoig/sorting-visualizers
cd sorting-visualizer
npm install
npm run dev
```

## Sorting Algorithms

At this moment, the following sorting algorithms are implemented:
 - bubble sort

In the future, I will add more sorting algorithms.

### Bubble Sort

The bubblesort algorithm is a simple and easy-to-understand sorting algorithm used to sort a list of elements. Its name is derived from the fact that larger elements "bubble" up to their correct position, similar to how bubbles rise in a liquid.

Bubblesort works by comparing adjacent pairs of elements and swapping them if they are in the wrong order. This process is repeated several times until all elements are in their correct positions. Here's the pseudocode for the bubblesort algorithm:

1. Start the bubblesort algorithm
2. Define a list of elements to be sorted
3. Get the number of elements in the list (n)
4. Repeat steps 5-7 for i from 0 to n-1
5. Repeat steps 6-7 for j from 0 to n-i-1
6. If the element at position j is greater than the element at position j+1, swap them
7. End of the inner loop
8. End of the outer loop
9. End of the bubblesort algorithm

In each outer iteration (step 4), the algorithm compares adjacent elements and swaps them if they are in the wrong order. This means that in each inner iteration (step 5), the largest element in the unsorted portion of the list "bubbles up" to its correct position.

The algorithm continues iterating until no swaps are made in a complete iteration, indicating that the list is sorted and there's no need to continue. This is achieved by checking that no swaps occur in the inner loop.

The bubblesort algorithm has a time complexity of O(n^2), which means its efficiency decreases significantly for large lists. However, due to its simplicity, it can be useful in cases where the list is already nearly sorted or when algorithm simplicity is more important than efficiency.


![Bubble Sort](https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif)

You can find the code for the bubble sort algorithm in [here.](docs/bubbleSort.ts)

### Selection Sort

The selection sort algorithm is a simple sorting algorithm used to sort a list of elements. The approach of selection sort is to repeatedly find the smallest (or largest, depending on the sorting order) element from the unsorted portion of the list and place it at the beginning of the sorted portion.

Here's the pseudocode for the selection sort algorithm:

1. Start the selection sort algorithm
2. Define a list of elements to be sorted
3. Get the number of elements in the list (n)
4. Repeat steps 5-7 for i from 0 to n-1
5. Set the minimum index to i
6. Repeat steps 7-8 for j from i+1 to n
7. If the element at position j is smaller than the element at the minimum position, update the minimum index to j
8. End of the inner loop
9. Swap the element at position i with the element at the minimum position
10. End of the outer loop
11. End of the selection sort algorithm

In each outer iteration (step 4), the algorithm searches for the smallest element in the unsorted portion of the list and places it at the correct position at the beginning of the sorted portion. To do this, a search is performed in the unsorted portion of the list (step 6) to find the smallest element, and the minimum index is updated accordingly.

Once the smallest element is found, it is swapped with the element at the current position of the outer iteration (step 9). This ensures that in each outer iteration, the smallest element is placed at the correct position in the sorted list.

The selection sort algorithm also has a time complexity of O(n^2), which means its efficiency decreases significantly for large lists. However, unlike bubblesort, the selection sort minimizes the number of swaps performed, which can be beneficial in some cases where swaps are expensive compared to comparisons.

![Selection Sort](https://markbowman.org/LCC/SortSelection.gif)

You can find the code for the bubble sort algorithm in [here.](docs/selectionSort.ts)