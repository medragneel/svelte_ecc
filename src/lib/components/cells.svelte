<script lang="ts">
    import "$lib/styles/global.css";
    import Cell from "./cell.svelte";
    import { store, reset } from "$lib/stores/store";
    import FilterCells from "./filterCells.svelte";
    let selectedFilter: App.filtersType = "All";

    function setFilter(newFilter: App.filtersType): void {
        selectedFilter = newFilter;
    }
    function filterCells(cells: App.Cell[], selectedFilter: App.filtersType) {
        switch (selectedFilter) {
            case "All":
                return cells;
            case "Fs":
                return cells.filter((todo) => todo.fs);
            case "Rc":
                return cells.filter((todo) => todo.rc);
            default:
                return cells;
        }
    }
    $: filtredCells = filterCells($store.cells as App.Cell[], selectedFilter);
</script>

<div class="main container">
    <br />
    <div class="total align-center btn btn-dark-outline">
        <h2>Counter: {$store.total}</h2>
    </div>
    <br />
    <FilterCells {selectedFilter} {setFilter} />

    <br />
    <div class="grid">
        {#each filtredCells as cell (cell.name)}
            <Cell {cell} />
        {/each}
    </div>
    <button class="reset btn btn-dark-outline" on:click={reset}>reset</button>
</div>

<style>
    .reset {
        position: fixed;
        bottom: 20px;
        right: 20px;
    }
</style>
