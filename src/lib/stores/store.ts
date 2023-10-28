import { writable } from "svelte/store";
import { browser } from "$app/environment"
// import * as images from "$lib/index"

// Define your initial state
const initialState = {
    cells: [
        { name: "Monocyte", count: 0, image: "/images/mono.d68cc6a2447145ddd102.png", fs: true },
        { name: "Lymphocyte", count: 0, image: "/images/lym.a6faba81cc207c2c4c03.png", fs: true, rc: false },
        { name: "Eosinophile", count: 0, image: "/images/eo.8485a4172b6aeec1d24a.png", fs: true, rc: false },
        { name: "Promyelocyte", count: 0, image: "/images/Promyelocyte.png", fs: false, rc: false },
        { name: "Pnn", count: 0, image: "/images/neutro.ebe38859a5a5925aaaea.png", fs: true, rc: false },
        { name: "Monoblaste", count: 0, image: "/images/monoblast.8a75e20bdecfcf879b64.png", fs: false, rc: false },
        { name: "Blaste", count: 0, image: "/images/lym.a6faba81cc207c2c4c03.png", fs: false, rc: false },
        { name: "Myelocyte", count: 0, image: "/images/myelocyte.f1bffcb411231cd7c51a.png", fs: false, rc: false },
        { name: "Basophile", count: 0, image: "/images/baso.360d8e71d467a31ffbdb.png", fs: true, rc: false },
        { name: "Promonocyte", count: 0, image: "/images/promonocyte.d4ba100be6fe7dbb4d9b.png", fs: false, rc: false },
        { name: "Myeloblaste", count: 0, image: "/images/myelo.0f8332a8c05c0ffc8f5d.png", fs: false, rc: false },
        { name: "Erythroblaste", count: 0, image: "/images/ery.33b1c69d28c98ec68036.png", fs: false, rc: false },
        { name: "reticulocyte", count: 0, image: "/images/reticulocyte.f53c4ff19ac690cb89e8.png", fs: false, rc: true },
        { name: "hematie", count: 0, image: "/images/hematie.png", fs: false, rc: true },
    ],
    total: 0
};

// Create a writable Svelte store
const store = writable(initialState);

// Load state from localStorage
const storedState = browser && localStorage.getItem("svelte-store");
if (storedState) {
    store.set(JSON.parse(storedState));
}

// Define mutations
const increment = (cell: App.Cell) => {
    store.update((currentState) => {
        const updatedState = { ...currentState };
        const targetCell = updatedState.cells.find((c) => c.name === cell.name);
        if (targetCell) {
            targetCell.count++;
            updatedState.total++;
            saveState(updatedState as App.State);
        }
        return updatedState;
    });
};

const decrement = (cell: App.Cell) => {
    store.update((currentState) => {
        const updatedState = { ...currentState };
        const targetCell = updatedState.cells.find((c) => c.name === cell.name);
        if (targetCell && targetCell.count > 0) {
            targetCell.count--;
            updatedState.total--;
            saveState(updatedState as App.State);
        }
        return updatedState;
    });
};

const reset = () => {
    store.update((currentState) => {
        const updatedState = { ...currentState };
        updatedState.cells.forEach((cell) => {
            cell.count = 0;
        });
        updatedState.total = 0;
        saveState(updatedState as App.State);
        return updatedState;
    });
};

// Function to save state to localStorage
function saveState(state: App.State) {
    localStorage.setItem("svelte-store", JSON.stringify(state));
}


export { store, increment, decrement, reset };

