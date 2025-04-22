import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Types } from '../../types';



export const {
    KeyboardNavigationContext,
    useKeyboardNavigationContextProxy,
    useKeyboardNavigationContextSelector,
} = (
    ContextSelectable.createContextWithHooks<
        Types.Context
    >().withName('KeyboardNavigation')
);