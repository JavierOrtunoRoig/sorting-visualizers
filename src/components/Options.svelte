<script>
  import { createEventDispatcher } from "svelte";
  import RangeSlider from "svelte-range-slider-pips";

  let elementsSlider = [5];
  let speedSlider = [1000];
  const dispatch = createEventDispatcher();

  function updateNumberOfElemets() {
    dispatch("updateNumberElements", {
      variable: elementsSlider[0],
    });
  }

  function updateSpeed() {
    dispatch("updateSpeed", {
      variable: elementsSlider[0],
    });
  }
</script>

<div class="container">
  <RangeSlider
    min={5}
    max={100}
    step={1}
    float
    pips
    first="label"
    last="label"
    bind:values={elementsSlider}
    on:change={updateNumberOfElemets}
  />
  <RangeSlider
    min={0}
    max={2000}
    step={10}
    float
    pips
    first="label"
    last="label"
    bind:values={speedSlider}
    on:change={updateSpeed}
  />

  <div>
    <p><span>Number of Elements:</span> {elementsSlider}</p>
    <p><span>Speed of animations:</span> {speedSlider}</p>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  span {
    font-weight: bold;
    color: orange;
  }
</style>
