import * as components from './components';
import * as context from './context';
import * as types from './types';



export namespace Dialog {
    export import Provider = components.DialogProvider;

    export import Wrapper = components.DialogWrapper;

    export import Types = types.Types;

    export const {
        DialogContext: Context,
        useDialogContextProxy: useContextProxy,
        useDialogContextSelector: useContextSelector,
    } = context;
}