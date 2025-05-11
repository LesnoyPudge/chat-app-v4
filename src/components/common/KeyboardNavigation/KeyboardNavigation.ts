import * as components from './components';
import * as context from './context';
import * as hooks from './hooks';
import * as types from './types';



export namespace KeyboardNavigation {
    export import Types = types.Types;

    export const {
        KeyboardNavigationContext: Context,
        useKeyboardNavigationContextProxy: useContextProxy,
        useKeyboardNavigationContextSelector: useContextSelector,
    } = context;

    export const {
        KeyboardNavigationProvider: Provider,
        KeyboardNavigationItem: Item,
    } = components;

    export const {
        useKeyboardNavigationOnMove: useOnMove,
        useKeyboardNavigationTabIndex: useTabIndex,
        useKeyboardNavigationIsCurrentId: useIsCurrentId,
        useKeyboardNavigationCommonItem: useCommonItem,
        useKeyboardNavigationSetId: useSetId,
    } = hooks;
}