import * as components from './components';
import * as context from './context';
import * as types from './types';



export namespace GlobalLoader {
    export import Types = types.Types;

    export const {
        GlobalLoaderContext: Context,
    } = context;

    export const {
        GlobalLoaderToggle: Toggle,
        GlobalLoaderWrapper: Wrapper,
        GlobalLoaderDisable: Disable,
    } = components;
}