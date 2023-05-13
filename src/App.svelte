<script lang="ts">
  import Bar from "./components/Bar.svelte";
  import { bubbleSort } from "./helpers/bubbleSort";
  import { playNote } from "./helpers/main";
  import { init } from "./helpers/logic";

  const numberOfElements = 100;
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
    console.log(actualState);
  };

  const handlePlay = () => {
    const moves = bubbleSort(actualState);

    const interval = setInterval(() => {
      const move = moves.shift();
      if (move) {
        actualState = [...move];
        playNote(frecuency);
        if (frecuency < 2000) 
          frecuency += 1;
        console.log(frecuency);
      } else {
        clearInterval(interval);
        actualState = actualState.map((item) => ({ ...item, type: "sorted" }));
      }
    }, 1);
  };

</script>

<main>
  <h1>Sorting Visualizer</h1>
  <div id="container">
    {#each actualState as { value, type }}
      <Bar {value} {type} />
    {/each}
  </div>

  <div class="line" />

  <div>
    <button on:click={handleInit}>init</button>
    <button on:click={handlePlay}>play</button>
  </div>
</main>

<style>
  .line {
    width: 100%;
    height: 1px;
    background-color: #fff;
  }

  #container {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    height: 100px;
    width: auto;
  }
</style>
