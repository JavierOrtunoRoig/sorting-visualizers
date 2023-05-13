<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import RangeSlider from "svelte-range-slider-pips";
  import { init, playAlgotimh, setFrequency } from "../helpers/logic";
  import { playNote } from "../helpers/main";

  export let state;
  let elementsSlider = [5];
  let speedSlider = [1000];
  let frecuency = setFrequency(elementsSlider[0]);

  const dispatch = createEventDispatcher();

  function updateState(state) {
    dispatch("updateState", {
      variable: state,
    });
  }

  const handleInit = () => {
    state = [...init(elementsSlider[0])];
    updateState(state);
  };

  const handlePlay = () => {
    playAlgotimh(state, elementsSlider[0], speedSlider[0], frecuency, updateState, playNote);
  };
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
  />

  <div>
    <p><span>Number of Elements:</span> {elementsSlider}</p>
    <p><span>Speed of animations:</span> {speedSlider}</p>
    <button on:click={handleInit}>init</button>
    <button on:click={handlePlay}>play</button>
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
