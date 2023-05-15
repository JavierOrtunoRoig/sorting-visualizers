<script lang="ts">
  import RangeSlider from "svelte-range-slider-pips";
  import { createEventDispatcher, onMount } from "svelte";
  import { init, playAlgotimh, setFrequency, playNote } from "../helpers/logic";

  export let state;
  
  let widthSlider = [10];
  let elementsSlider = [5];
  let speedSlider = [1000];
  let frecuency = setFrequency(elementsSlider[0]);
  let interval;
  let sound;

  const dispatch = createEventDispatcher();

  function setInterval(newInterval) {
    interval = newInterval;
  }

  function updateState(state) {
    dispatch("updateState", {
      variable: state,
    });
  }

  function updateWidth(event) {
    dispatch("updateWidth", {
      variable: event.detail.value,
    });
  }

  const handlePlay = () => {
    playAlgotimh(state, elementsSlider[0], speedSlider[0], frecuency, updateState, playNote, setInterval);
  };
  
  const renderGraph = () => {
    state = [...init(elementsSlider[0])];
    updateState(state);
  }

  onMount(() => {
    renderGraph();
  });
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
    on:change={() => {
      clearInterval(interval);
      renderGraph();
    }}
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
    on:change={() => {
      clearInterval(interval)
      renderGraph();
    }}
  />
  <RangeSlider
    min={5}
    max={50}
    step={1}
    float
    pips
    first="label"
    last="label"
    bind:values={widthSlider}
    on:change={updateWidth}
  />

  <div>
    <p><span>Number of Elements:</span> {elementsSlider}</p>
    <p><span>Speed of animations:</span> {speedSlider}</p>
    <p><span>Width of bars:</span> {widthSlider}</p>
    <button class="play" on:click={handlePlay}>play</button>
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

  @media (max-width: 800px) {
    .play {
      margin-bottom: 10px;
    }
  }

</style>
