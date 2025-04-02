import { ContextSelectable, useFunction } from '@lesnoypudge/utils-react';
import { Types } from '../../types';
import { KeyboardNavigationContext } from '../../context';



export const useKeyboardNavigationSetFocusId: Types.useSetFocusId.Fn = (
    itemId,
) => {
    const setCurrentFocusedId = ContextSelectable.useSelector(
        KeyboardNavigationContext,
        (v) => v.setCurrentFocusedId,
    );

    const setFocusId = useFunction(() => {
        setCurrentFocusedId(itemId);
    });

    return setFocusId;
};