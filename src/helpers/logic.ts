import type { ArrayElement } from "../types";

export function init(numberOfElements: number): ArrayElement[] {
  return generateArray(numberOfElements).map((el) => ({
    value: el,
    type: 'unsorted',
  }));
}

function generateArray(numberOfElements: number): number[] {
  return Array.from({ length: numberOfElements }, () => Math.floor(Math.random() * 100));
}