import { useControls } from '../hooks';



export namespace Types {
    export type Controls = useControls.Return;

    export type WithControls = {
        controls: Controls;
    };
}