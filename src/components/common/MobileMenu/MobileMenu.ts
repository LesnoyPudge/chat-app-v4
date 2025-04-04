import * as components from './components';
import * as hooks from './hooks';
import * as context from './context';
import * as types from './types';



export namespace MobileMenu {
    export import Types = types.Types;

    export const {
        MobileMenuContext: Context,
    } = context;

    export const {
        MobileMenuProvider: Provider,
    } = components;

    export const { useMobileMenu } = hooks;
}