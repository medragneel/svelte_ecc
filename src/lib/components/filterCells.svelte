<script lang="ts">
    type SetfilterType = (newFilter: App.filtersType) => void;
    export let selectedFilter: App.filtersType;
    export let setFilter: SetfilterType;
    let filters: App.filtersType[] = ["All", "Fs", "Rc"];
</script>

<div class="filters">
    <div class="carousel">
        {#each filters as filter}
            <button
                on:click={() => setFilter(filter)}
                class:selected={selectedFilter === filter}
                class="filter"
            >
                {filter}
            </button>
        {/each}
    </div>
</div>

<style>
    .filters {
        display: flex;
        gap: 2rem;
    }

    .filter {
        text-transform: capitalize;
        padding: 0.5rem 1rem;
        border: 1px solid transparent;
        border-radius: 6px;
    }

    .filter:hover {
        border: 1px solid transparent;
    }

    .selected {
        background-color: #222;
        color: whitesmoke;
    }
</style>
