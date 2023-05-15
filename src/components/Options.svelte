<script lang="ts">
  import RangeSlider from "svelte-range-slider-pips";
  import Select from "svelte-select";
  import type { ArrayElement } from "../types";
  import { createEventDispatcher, onMount } from "svelte";
  import { init, playAlgotimh, setFrequency, playNote, clearState } from "../helpers/logic";

  export let state: ArrayElement[];

  let selectedAlgoritmh;
  let widthSlider = [10];
  let elementsSlider = [5];
  let speedSlider = [1000];
  let frecuency = setFrequency(elementsSlider[0]);
  let interval;
  const algoritmhs = [
    {
      value: "bubble",
      label: "Bubble Sort",
    },
    {
      value: "selection",
      label: "Selection Sort",
    },
    {
      value: "insertion",
      label: "Insertion Sort",
    }
  ];

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
    playAlgotimh(
      selectedAlgoritmh,
      state,
      elementsSlider[0],
      speedSlider[0],
      frecuency,
      updateState,
      playNote,
      setInterval
    );
  };

  const renderGraph = () => {
    state = [...init(elementsSlider[0])];
    updateState(state);
  };

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
      clearInterval(interval);
      updateState(clearState(state));
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
    <p><span>Number of elements:</span> {elementsSlider}</p>
    <p><span>Speed of animations:</span> {speedSlider}</p>
    <p><span>Width of bars:</span> {widthSlider}</p>

    <div class="play">
      <Select class="external-select" value={algoritmhs[0]} items={algoritmhs} bind:justValue={selectedAlgoritmh} placeholder={"Please, select an algoritimh"} />
      <button class="play" on:click={handlePlay}>play</button>
    </div>
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

  :global(.external-select) {
    color: black !important;
    width: 50% !important;
  }

  div.play {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  @media (max-width: 800px) {
    div.play {
      flex-direction: column;
    }

    :global(.external-select) {
      width: 80% !important;
    }

    button.play {
      margin: 10px;
      width: 80%;
    }
  }
</style>
