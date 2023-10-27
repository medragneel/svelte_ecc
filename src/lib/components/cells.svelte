<script lang="ts">
    import "$lib/styles/global.css";
    import Cell from "./cell.svelte";
    import { store } from "$lib/stores/store";
    import FilterCells from "./filterCells.svelte";
    import FloatButton from "./floatButton.svelte";

    let selectedFilter: App.filtersType = "All";
    $: ret = $store.cells.find((cell) => cell.name === "reticulocyte");
    $: hem = $store.cells.find((cell) => cell.name === "hematie");
    $: rhcounter =
        ret && hem ? ((ret?.count / hem?.count) * 100).toFixed(3) : 0;

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
        {#if selectedFilter === "Rc"}
            <span>RH {rhcounter} %</span>
        {/if}
    </div>
    <br />
    <FilterCells {selectedFilter} {setFilter} />

    <br />
    <div class="grid">
        {#each filtredCells as cell (cell.name)}
            <Cell {cell} />
        {/each}
    </div>
    <FloatButton />
</div>
