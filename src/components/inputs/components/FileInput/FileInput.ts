import * as components from './components';
import * as context from './context';
import * as hooks from './hooks';
import * as types from './types';



export namespace FileInput {
    export import Types = types.FileInputTypes;

    export const {
        FileInputNode: Node,
        FileInputProvider: Provider,
    } = components;

    export const {
        FileInputContext: Context,
    } = context;

    export const {
        useFileInputContext: useContext,
    } = hooks;
}