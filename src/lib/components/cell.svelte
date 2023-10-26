<script lang="ts">
    import { increment, decrement } from "$lib/stores/store";
    export let cell: App.Cell;
</script>

<div class="card ds-f d-col js-center al-center">
    <div class="card-title">
        <img src={cell.image} alt={cell.name} loading="lazy" />
    </div>
    <b>{cell.name}</b>
    <br />
    <div class="card-content ds-f js-center al-center g-2">
        <button class="btn btn-dark-outline" on:click={()=>decrement(cell)}> - </button>
        <h1>{cell.count}</h1>
        <button class="btn btn-dark-outline" on:click={()=>increment(cell)}> + </button>
    </div>
</div>

<style>
    img {
        width: 80px;
    }
</style>
