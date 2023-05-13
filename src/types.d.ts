export type Algorithm = 'bubble' | 'insertion' | 'selection' | 'quick' | 'merge' | 'heap';
export type Speed = 'slow' | 'normal' | 'fast';
export type Size = 'small' | 'medium' | 'large';
export type AlgorithmState = 'idle' | 'running' | 'finished';
export type AlgorithmStep = 'unsorted' | 'sorted' | 'pivot' | 'compare' | 'swap';

export interface ArrayElement {
  value: number;
  type: AlgorithmStep
}