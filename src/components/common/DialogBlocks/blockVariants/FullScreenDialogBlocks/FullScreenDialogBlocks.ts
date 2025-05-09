import * as components from './components';
import * as context from './context';
import * as types from './types';
import * as hooks from './hooks';



export namespace FullScreenDialogBlocks {
    export import Types = types.Types;

    export const {
        FullScreenDialogBlocksProvider: Provider,
        FullScreenDialogBlocksWrapper: Wrapper,
        FullScreenDialogBlocksFormConfirmationBar: FormConfirmationBar,
        FullScreenDialogBlocksCloseButton: CloseButton,
        FullScreenDialogBlocksMobileControls: MobileControls,
        FullScreenDialogBlocksNavigationSide: NavigationSide,
        FullScreenDialogBlocksContentSide: ContentSide,
        FullScreenDialogBlocksNavigationHeading: NavigationHeading,
        FullScreenDialogBlocksNavigationItem: NavigationItem,
        FullScreenDialogBlocksTabTitle: TabTitle,
    } = components;

    export const {
        useFullScreenDialogBlocksHandleTabChange: useHandleTabChange,
    } = hooks;

    export const {
        FullScreenDialogBlocksContext: Context,
        useFullScreenDialogBlocksContextProxy: useContextProxy,
        useFullScreenDialogBlocksContextSelector: useContextSelector,
    } = context;
}