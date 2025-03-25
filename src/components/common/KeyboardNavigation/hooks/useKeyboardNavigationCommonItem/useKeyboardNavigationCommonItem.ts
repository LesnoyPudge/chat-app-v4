import { KeyboardNavigation } from '@/components';
import {
    ContextSelectable,
    Focus,
    useFunction,
} from '@lesnoypudge/utils-react';
import { Types } from '../../types';



export const useKeyboardNavigationCommonItem: Types.useCommonItem.Fn = ({
    elementRef,
    itemId,
}) => {
    const isFocused = KeyboardNavigation.useIsFocused(itemId);
    const tabIndex = KeyboardNavigation.useTabIndex(itemId);
    const isCurrentId = KeyboardNavigation.useIsCurrentId(itemId);
    const setNewFocusId = ContextSelectable.useSelector(
        KeyboardNavigation.Context,
        (v) => v.setCurrentFocusedId,
    );

    const setFocusId = useFunction(() => {
        if (isCurrentId) return;
        setNewFocusId(itemId);
    });

    KeyboardNavigation.useOnMove(itemId, () => {
        const element = elementRef.current;
        if (!element) return;

        Focus.moveFocusInside(element, {
            preventScroll: true,
        });

        element.scrollIntoView({
            behavior: 'instant',
            block: 'center',
            inline: 'center',
        });
    });

    return {
        isCurrentId,
        isFocused,
        tabIndex,
        setFocusId,
    };
};