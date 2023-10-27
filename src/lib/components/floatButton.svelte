<script lang="ts">
    import { reset } from "$lib/stores/store";
    import Modal from "./modal.svelte";
    let showModal = false;
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
        <form action="/" method="post">
            <label for="patient-name">
                Nom:
                <br />
                <br />

                <input type="text" name="patient-name" id="patient-input" />
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
    i{
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
