import * as components from './components';
import * as context from './context';
import * as hooks from './hooks';
import * as types from './types';
import * as utils from './utils';



export namespace TextInput {
    export import Types = types.TextInputTypes;

    export const {
        TextInputNode: Node,
        TextInputNodePure: NodePure,
        TextInputProvider: Provider,
        PasswordToggleButton,
        TextInputWrapper: Wrapper,
    } = components;

    export const {
        TextInputContext: Context,
    } = context;

    export const {
        useTextInputContext: useContext,
    } = hooks;

    export const {
        withDefaultProps,
    } = utils;
}