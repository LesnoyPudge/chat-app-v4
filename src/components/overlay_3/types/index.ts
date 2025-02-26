import { useControls } from '../hooks';



export type Controls = useControls.Return;

export type WithControls = {
    controls: Controls;
};