import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Types } from '../../types';
import { KeyboardNavigationContext } from '../../context';



export const useKeyboardNavigationIsCurrentId: Types.useIsCurrentId.Fn = (
    itemId,
) => {
    const isCurrentId = ContextSelectable.useSelector(
        KeyboardNavigationContext,
        (v) => itemId === v.currentFocusedId,
    );

    return isCurrentId;
};