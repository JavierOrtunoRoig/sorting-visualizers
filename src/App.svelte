<script lang="ts">
  import Bar from "./components/Bar.svelte";
  import Options from "./components/Options.svelte";

  let state = [];
  let width = 10;
</script>

<main>
  <h1>Sorting Visualizer</h1>

  <div class="container">
    <div class="options">
      <Options
        state={state}
        on:updateState={(event) => {
          state = event.detail.variable;
        }}
        on:updateWidth={(event) => {
          width = event.detail.variable;
        }}
      />
    </div>
  
    <div class="content-container">
      <div class="sorted-algotihm">
        {#each state as { value, type }}
          <Bar {value} {type} {width} />
        {/each}
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
    width: 70%;
  }

  .sorted-algotihm {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    height: 500px;
    width: 100%;
  }

  .options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 30%;
  }
</style>
