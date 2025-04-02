import { KeyboardNavigation } from '@/components';
import { Focus, useUnmountEffect } from '@lesnoypudge/utils-react';
import { Types } from '../../types';
import { useEffect, useRef } from 'react';



export const useKeyboardNavigationCommonItem: Types.useCommonItem.Fn = ({
    elementRef,
    itemId,
}) => {
    const shouldMoveRef = useRef(false);
    const timeoutIdRef = useRef<number>();
    const isFocused = KeyboardNavigation.useIsFocused(itemId);
    const tabIndex = KeyboardNavigation.useTabIndex(itemId);
    const isCurrentId = KeyboardNavigation.useIsCurrentId(itemId);
    const setFocusId = KeyboardNavigation.useSetFocusId(itemId);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;
        if (!shouldMoveRef.current) return;

        shouldMoveRef.current = false;

        Focus.moveFocusInside(element, {
            preventScroll: true,
        });

        element.scrollIntoView({
            behavior: 'instant',
            block: 'center',
            inline: 'center',
        });
    });

    KeyboardNavigation.useOnMove(itemId, () => {
        // at the moment of this callback is executed
        // element that we want to focus on still
        // has tabIndex -1.
        // in some cases that prevent us from focusing.
        shouldMoveRef.current = true;
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