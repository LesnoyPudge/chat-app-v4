import { ContextSelectable } from '@lesnoypudge/utils-react';
import { KeyboardNavigationContext } from '../../context';
import { Types } from '../../types';



export const useKeyboardNavigationTabIndex: Types.useTabIndex.Fn = (itemId) => {
    const tabIndex = ContextSelectable.useSelector(
        KeyboardNavigationContext,
        (v) => v.getTabIndex(itemId),
    );

    return tabIndex;
};