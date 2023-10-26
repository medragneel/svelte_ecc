// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
        interface Cell {
            name: string;
            count: number;
            image: string;
            fs: boolean;
            rc: boolean;
        }

        interface State {
            cells: Cell[];
            total: number;
        }
        type filtersType = "All" | "Fs" | "Rc"

        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface Platform {}
    }
}

export { };
