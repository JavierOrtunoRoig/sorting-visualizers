<script lang="ts">
  import type { AlgorithmStep } from "../types";

  export let value: number;
  export let type: AlgorithmStep = "unsorted";
  export let width: number;

  $: color = {
    unsorted: "white",
    compare: "red",
    swap: "green",
    sorted: "cyan",
  }[type];

</script>

<div class="bar" style="--height:{value}%; --width:{width}px; --color:{color}" />

<style>
  .bar {
    width: var(--width);
    height: var(--height);
    background-color: var(--color);
    box-shadow: 0 0 5px var(--color);
    margin: 1px 1px;
  }

</style>
