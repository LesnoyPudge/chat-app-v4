import { KeyboardNavigation } from '@/components';
import {
    ContextSelectable,
    Focus,
    useFunction,
    useUnmountEffect,
} from '@lesnoypudge/utils-react';
import { Types } from '../../types';
import { useRef } from 'react';



export const useKeyboardNavigationCommonItem: Types.useCommonItem.Fn = ({
    elementRef,
    itemId,
}) => {
    const timeoutIdRef = useRef<number>();
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
        // at the moment of this callback is executed
        // element that we want to focus on still
        // has tabIndex -1.
        // in some cases that prevent us from focusing.
        timeoutIdRef.current = setTimeout(() => {
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
    });

    useUnmountEffect(() => {
        clearTimeout(timeoutIdRef.current);
    });

    return {
        isCurrentId,
        isFocused,
        tabIndex,
        setFocusId,
    };
};