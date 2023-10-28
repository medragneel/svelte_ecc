<script lang="ts">
    import { reset } from "$lib/stores/store";
    import Modal from "./modal.svelte";
    let showModal = false;
    let patientName = "";
    let url =
        "";
    async function sendData() {
        const date = new Date();
        const time = new Intl.DateTimeFormat("en-GB", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
        }).format(date);

        // Retrieve cell counts from localStorage
        const svelteStore = JSON.parse(
            localStorage.getItem("svelte-store") ?? "null"
        );
        const cells = svelteStore?.cells || [];

        // Create the body for the POST request
        const body = {
            cell: {
                patient: patientName,
                date: date.toLocaleDateString(),
                time: time,
                mono: findCellCount("Monocyte"),
                lym: findCellCount("Lymphocyte"),
                eosi: findCellCount("Eosinophile"),
                pnn: findCellCount("Pnn"),
                Baso: findCellCount("Basophile"),
                monobl: findCellCount("Monoblaste"),
                blaste: findCellCount("Blaste"),
                myelocyte: findCellCount("Myelocyte"),
                Ery: findCellCount("Erythroblaste"),
                myelobl: findCellCount("Myeloblaste"),
                Promono: findCellCount("Promonocyte"),
                Promyelocyte: findCellCount("Promyelocyte"),
                total: svelteStore.total,
                reticulocyte: findCellCount("reticulocyte"),
                hematie: findCellCount("hematie"),
                rehe: calculateRehe(),
            },
        };

        // Define the URL where you want to send the data

        // Send the POST request
        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                // Do something with the response
                console.log(json.cell);
            });

        // Reset patientName (assuming it's a global variable)
        patientName = "";

        // Helper function to find cell count by name
        function findCellCount(cellName: string) {
            const cell = cells.find((cell: App.Cell) => cell.name === cellName);
            return cell ? cell.count : 0;
        }

        // Helper function to calculate rehe
        function calculateRehe() {
            const retiCount = findCellCount("reticulocyte");
            const hematieCount = findCellCount("hematie");
            return ((retiCount / hematieCount) * 100).toFixed(3) ?? 0;
        }
    }
</script>

<div class="floating-container">
    <div class="floating-button">+</div>
    <div class="element-container">
        <button class="reset btn btn-dark float-element" on:click={reset}>
            <i class="fa-regular fa-window-restore" />
        </button>

        <button
            class="showModal btn btn-dark float-element"
            on:click={() => (showModal = true)}
        >
            <i class="fa-regular fa-paper-plane" />
        </button>
    </div>
</div>

<Modal bind:showModal>
    <h1 slot="header">Patient</h1>
    <div class="form-container">
        <form action="/" method="post" on:submit|preventDefault={sendData}>
            <label for="patient-name">
                Nom:
                <br />
                <br />

                <input
                    bind:value={patientName}
                    type="text"
                    name="patient-name"
                    id="patient-input"
                />
                <br />
                <br />

                <button class="btn btn-dark">Envoyer</button>
            </label>
        </form>
    </div>
</Modal>

<style>
    @-webkit-keyframes come-in {
        0% {
            -webkit-transform: translatey(100px);
            transform: translatey(100px);
            opacity: 0;
        }
        30% {
            -webkit-transform: translateX(-50px) scale(0.4);
            transform: translateX(-50px) scale(0.4);
        }
        70% {
            -webkit-transform: translateX(0px) scale(1.2);
            transform: translateX(0px) scale(1.2);
        }
        100% {
            -webkit-transform: translatey(0px) scale(1);
            transform: translatey(0px) scale(1);
            opacity: 1;
        }
    }
    @keyframes come-in {
        0% {
            -webkit-transform: translatey(100px);
            transform: translatey(100px);
            opacity: 0;
        }
        30% {
            -webkit-transform: translateX(-50px) scale(0.4);
            transform: translateX(-50px) scale(0.4);
        }
        70% {
            -webkit-transform: translateX(0px) scale(1.2);
            transform: translateX(0px) scale(1.2);
        }
        100% {
            -webkit-transform: translatey(0px) scale(1);
            transform: translatey(0px) scale(1);
            opacity: 1;
        }
    }
    i {
        display: flex;
        justify-content: center;
    }
    .floating-container {
        position: fixed;
        width: 100px;
        height: 100px;
        bottom: 0;
        right: 0;
        margin: 35px 5px;
    }
    .floating-container:hover {
        height: 300px;
    }
    .floating-container:hover .floating-button {
        box-shadow: 0 10px 25px rgba(57, 57, 57, 0.6);
        -webkit-transform: translatey(5px);
        transform: translatey(5px);
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
    }
    .floating-container:hover .element-container .float-element:nth-child(1) {
        -webkit-animation: come-in 0.4s forwards 0.2s;
        animation: come-in 0.4s forwards 0.2s;
    }
    .floating-container:hover .element-container .float-element:nth-child(2) {
        -webkit-animation: come-in 0.4s forwards 0.4s;
        animation: come-in 0.4s forwards 0.4s;
    }
    .floating-container:hover .element-container .float-element:nth-child(3) {
        -webkit-animation: come-in 0.4s forwards 0.6s;
        animation: come-in 0.4s forwards 0.6s;
    }
    .floating-container .floating-button {
        position: absolute;
        width: 35px;
        height: 35px;
        bottom: 0;
        border-radius: 50%;
        left: 0;
        right: 0;
        margin: auto;
        line-height: 35px;
        text-align: center;
        font-size: 23px;
        z-index: 100;
        box-shadow: 0 10px 25px rgba(57, 57, 57, 0.6);
        cursor: pointer;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
    }
    .floating-container .float-element {
        display: block;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        margin: 15px auto;
        font-weight: 500;
        text-align: center;
        line-height: 50px;
        z-index: 0;
        opacity: 0;
        -webkit-transform: translateY(100px);
        transform: translateY(100px);
    }
</style>
