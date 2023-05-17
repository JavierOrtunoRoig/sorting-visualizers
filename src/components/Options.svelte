<script lang="ts">
  import RangeSlider from "svelte-range-slider-pips";
  import Select from "svelte-select";
  import type { ArrayElement } from "../types";
  import { createEventDispatcher, onMount } from "svelte";
  import {
    init,
    playAlgotimh,
    setFrequency,
    playNote,
    clearState,
    getAction,
  } from "../helpers/logic";

  export let state: ArrayElement[];

  let selectedAlgoritmh;
  let widthSlider = [20];
  let elementsSlider = [5];
  let speedSlider = [1000];
  let frecuency = setFrequency(elementsSlider[0]);
  let interval;
  let actualState = null;

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
    },
  ];

  const dispatch = createEventDispatcher();

  function setInterval(newInterval) {
    interval = newInterval;
  }

  function setActualState(newState) {
    const { action, firstIndex, secondIndex } = getAction(newState);
    actualState = {};
    actualState.values = newState;
    actualState.action = action;
    actualState.firstIndex = firstIndex;
    actualState.secondIndex = secondIndex;
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
      setInterval,
      setActualState
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
      <Select
        class="external-select"
        value={algoritmhs[0]}
        items={algoritmhs}
        bind:justValue={selectedAlgoritmh}
        placeholder={"Please, select an algoritimh"}
      />
      <button class="play" on:click={handlePlay}>play</button>
    </div>
  </div>

  {#if actualState?.action === "swaping"}
    <p>
      We are <span class="swaping">swaping</span> indices
      <span class="swaping">{actualState.firstIndex}</span>
      and <span class="swaping">{actualState.secondIndex}</span>
    </p>
  {:else if actualState?.action === "comparing"}
    <p>
      We are <span class="comparing">comparing</span> indices
      <span class="comparing">{actualState.firstIndex}</span>
      and <span class="comparing">{actualState.secondIndex}</span>
    </p>
  {:else if actualState?.action === "sorted"}
    <p>
      Indices <span class="sorted">{actualState.firstIndex}</span> and
      <span class="sorted">{actualState.secondIndex}</span> are 
      <span class="sorted">sorted</span>
    </p>
  {:else if actualState?.action === "end"}
    <p>The array is sorted</p>
  {:else}
    <p>The algoritmh is stopped</p>
  {/if}
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

  span.comparing {
    color: rgb(255, 74, 74);
  }

  span.swaping {
    color: rgb(5, 196, 5);
  }

  span.sorted {
    color: rgb(8, 216, 216);
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
