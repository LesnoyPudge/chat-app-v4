import * as components from './components';
import * as context from './context';
import * as hooks from './hooks';
import * as types from './types';


export namespace KeyboardNavigation {
    export import Types = types.Types;

    export import Context = context.KeyboardNavigationContext;

    export import Provider = components.KeyboardNavigationProvider;

    export const {
        useKeyboardNavigationControls: useControls,
        useKeyboardNavigationIsFocused: useIsFocused,
        useKeyboardNavigationOnMove: useOnMove,
        useKeyboardNavigationTabIndex: useTabIndex,
        useKeyboardNavigationIsCurrentId: useIsCurrentId,
        useKeyboardNavigationCommonItem: useCommonItem,
        useKeyboardNavigationSetFocusId: useSetFocusId,
    } = hooks;
}