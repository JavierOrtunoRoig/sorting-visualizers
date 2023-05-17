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

<div class="container" style="--height:{value}%; --width:{width}px; --color:{color}" >
  {#if width >= 20}
    <p>{value}</p>
  {/if}
  <div class="bar" />
</div>


<style>
  p {
    margin: 0;
    padding: 1px;
    text-align: center;
    color: white;
    font-size: calc(var(--width) / 1.5);
  }
  .bar {
    width: var(--width);
    height: var(--height);
    background-color: var(--color);
    box-shadow: 0 0 5px var(--color);
    margin: 1px 1px;
  }

  .container {
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }
</style>
