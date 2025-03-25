import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Types } from '../../types';
import { KeyboardNavigationContext } from '../../context';



export const useKeyboardNavigationIsFocused: Types.useIsFocused.Fn = (
    itemId,
) => {
    const isFocused = ContextSelectable.useSelector(
        KeyboardNavigationContext,
        (v) => v.getIsFocused(itemId),
    );

    return isFocused;
};