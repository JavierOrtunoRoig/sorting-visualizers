<script lang="ts">
  import Bar from "./components/Bar.svelte";
  import { bubbleSort } from "./helpers/bubbleSort";
  import { playNote } from "./helpers/main";
  import { init } from "./helpers/logic";
  import Options from "./components/Options.svelte";

  let numberOfElements = 5;
  let speed = 1000;
  let actualState = [];
  let frecuency = setFrequency();

  function setFrequency() {
    if (numberOfElements <= 10) {
      return 800;
    } else if (numberOfElements <= 20) {
      return  500;
    } else {
      return 100;
    }
  }

  const handleInit = () => {
    actualState = [...init(numberOfElements)];
  };

  const handlePlay = () => {
    const moves = bubbleSort(actualState);

    const interval = setInterval(() => {
      const move = moves.shift();
      if (move) {
        actualState = [...move];
        playNote(frecuency);
        if (frecuency < 1200) 
          frecuency += 1;
        else {
          frecuency = setFrequency();
        }
        console.log(frecuency);
      } else {
        clearInterval(interval);
        actualState = actualState.map((item) => ({ ...item, type: "sorted" }));
      }
    }, speed);
  };

  function updateNumberOfElements(event) {
    numberOfElements = event.detail.variable;
  }

  function updateSpped(event) {
    console.log(event);
    speed = event.detail.variable;
  }

</script>

<main>
  <h1>Sorting Visualizer</h1>

  <div class="container">
    <div class="options">
      <Options
        on:updateNumberElements={updateNumberOfElements}
        on:updateSpeed={updateSpped}
      />
    </div>
  
    <div class="content-container">
      <div class="sorted-algotihm">
        {#each actualState as { value, type }}
          <Bar {value} {type} />
        {/each}
      </div>
    
    
      <div>
        <button on:click={handleInit}>init</button>
        <button on:click={handlePlay}>play</button>
      </div>
    </div>
  </div>

</main>

<style>

  /* set --range-slider to orange */
  :root {
    --range-handle-focus: orange;
    --range-handle: orange;
    --range-handle-inactive: orange;
  }

  h1 {
    color: orange;
  }

  .container {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 70%;
  }

  .sorted-algotihm {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    height: 500px;
    width: 200px;
  }

  .options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 30%;
  }
</style>
