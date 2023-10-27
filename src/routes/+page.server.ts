import { browser } from "$app/environment";
import { store } from "$lib/stores/store";

const url = 'https://api.sheety.co/8324915932b3ce14ae2f496ec019df01/ecc/cells';

export const actions = {
    default: async ({ request }) => {
        let formData = await request.formData();
        const patient = formData.get('patient-name');
        const date = new Date();
        const time = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        }).format(date);

        const ls = browser && localStorage.getItem('svelte-store')


        // Create the body for the POST request
        let body = {
            cell: {
                date: date.toLocaleDateString(),
                time: time,
                patient: patient,
                mono: store.subscribe((state) => state.cells.find((cell) => cell.name === 'Monocyte')?.count),
                lym: store.subscribe((state) => state.cells.find((cell) => cell.name === 'Lymphocyte')?.count),
                eosi: store.subscribe((state) => state.cells.find((cell) => cell.name === 'Eosinophile')?.count),
                pnn: store.subscribe((state) => state.cells.find((cell) => cell.name === 'Pnn')?.count),
                Baso: store.subscribe((state) => state.cells.find((cell) => cell.name === 'Basophile')?.count),
                monobl: store.subscribe((state) => state.cells.find((cell) => cell.name === 'Monoblaste')?.count),
                blaste: store.subscribe((state) => state.cells.find((cell) => cell.name === 'Blaste')?.count),
                myelocyte: store.subscribe((state) => state.cells.find((cell) => cell.name === 'Myelocyte')?.count),
                Ery: store.subscribe((state) => state.cells.find((cell) => cell.name === 'Erythroblaste')?.count),
                myelobl: store.subscribe((state) => state.cells.find((cell) => cell.name === 'Myeloblaste')?.count),
                Promono: store.subscribe((state) => state.cells.find((cell) => cell.name === 'Promonocyte')?.count),
                Promyelocyte: store.subscribe((state) => state.cells.find((cell) => cell.name === 'Promyelocyte')?.count),
                total: store.subscribe((state) => state.total),
                reticulocyte: store.subscribe((state) => state.cells.find((cell) => cell.name === 'reticulocyte')?.count),
                hematie: store.subscribe((state) => state.cells.find((cell) => cell.name === 'hematie')?.count),
                rehe: store.subscribe((state) => state.cells.find((cell) => cell.name === 'rehe')?.count) || 0
            }

        };
        console.log(body)

        // fetch(url, {
        //     method: 'POST',
        //     body: JSON.stringify(body),
        //     headers: {
        //         'Content-Type': "application/json"
        //     }
        // })
        //     .then((response) => response.json())
        //     .then(json => {
        //         // Do something with the response
        //         console.log(json.cell);
    }
};

