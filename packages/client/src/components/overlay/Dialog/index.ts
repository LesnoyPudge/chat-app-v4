import { DialogContext } from './context';
import { DialogProvider, DialogWrapper } from './components';


export namespace Dialog {
    export const Context = DialogContext;

    export type Context = DialogContext;

    export import Provider = DialogProvider;

    export import Wrapper = DialogWrapper;
}