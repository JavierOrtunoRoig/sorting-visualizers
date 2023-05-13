<script lang="ts">
  import type { AlgorithmStep } from "../types";

  export let value: number;
  export let type: AlgorithmStep = "unsorted";

  console.log({value, type});

  $: color = {
    unsorted: "white",
    compare: "red",
    swap: "green",
    sorted: "cyan",
  }[type];

</script>

<div class="bar" style="--height:{value}%;--color:{color}" />

<style>
  .bar {
    width: 30px;
    height: var(--height);
    background-color: var(--color);
    margin: 1px 1px;
  }
</style>
