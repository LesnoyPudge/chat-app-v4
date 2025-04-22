import { KeyboardNavigation } from '@/components';
import { Focus } from '@lesnoypudge/utils-react';
import { Types } from '../../types';
import { useEffect, useRef } from 'react';



export const useKeyboardNavigationCommonItem: Types.useCommonItem.Fn = ({
    elementRef,
    itemId,
}) => {
    const shouldMoveRef = useRef(false);
    const tabIndex = KeyboardNavigation.useTabIndex(itemId);
    const isCurrentId = KeyboardNavigation.useIsCurrentId(itemId);
    const setId = KeyboardNavigation.useSetId(itemId);

    useEffect(() => {
        if (!shouldMoveRef.current) return;

        shouldMoveRef.current = false;

        const element = elementRef.current;

        if (!element) return;
        if (!isCurrentId) return;

        Focus.moveFocusInside(element, {
            preventScroll: true,
        });

        element.scrollIntoView({
            behavior: 'instant',
            block: 'center',
            inline: 'center',
        });
    }, [elementRef, isCurrentId]);

    KeyboardNavigation.useOnMove(itemId, () => {
        // at the moment of this callback is executed
        // element that we want to focus on
        // still has tabIndex -1.
        // that prevent us from focusing.
        shouldMoveRef.current = true;
    });

    return {
        isCurrentId,
        tabIndex,
        setId,
    };
};