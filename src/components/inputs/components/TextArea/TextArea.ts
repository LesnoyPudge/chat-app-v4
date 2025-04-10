import * as components from './components';
import * as context from './context';
import * as hooks from './hooks';
import * as types from './types';



export namespace TextArea {
    export import Types = types.TextAreaTypes;

    export const {
        TextAreaNode: Node,
        TextAreaProvider: Provider,
    } = components;

    export const {
        TextAreaContext: Context,
    } = context;

    export const {
        useTextAreaContext: useContext,
    } = hooks;
}