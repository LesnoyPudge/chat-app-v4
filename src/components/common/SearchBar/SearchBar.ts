import * as components from './components';
import * as hooks from './hooks';



export namespace SearchBar {
    export import Node = components.SearchBarNode;

    export const {
        useSearchControls: useControls,
    } = hooks;
}