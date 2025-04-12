import * as components from './components';
import * as context from './context';
import * as types from './types';
import * as hooks from './hooks';



export namespace Dialog {
    export import Provider = components.DialogProvider;

    export import Wrapper = components.DialogWrapper;

    export import Context = context.DialogContext;

    export import Types = types.Types;

    export const {
        useDialogContext: useContext,
    } = hooks;
}