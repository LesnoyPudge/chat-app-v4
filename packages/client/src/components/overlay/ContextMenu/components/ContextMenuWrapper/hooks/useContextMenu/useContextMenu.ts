import {
    useContextSelector,
    useEventListener,
    useFunction,
    useRefManager,
} from '@lesnoypudge/utils-react';
import { Popover, RelativelyPositioned } from '@components';
import { isHtmlElement } from '@lesnoypudge/utils-web';



type Options = {
    leaderElementRef: (
        RelativelyPositioned.useRelativePosition.LeaderElementRef
    );
};

export const useContextMenu = ({
    leaderElementRef,
}: Options) => {
    const {
        closingThrottleRef,
        openOverlay,
    } = useContextSelector(Popover.Context);
    const leaderElementOrRectRef = useRefManager<
        RelativelyPositioned.useRelativePosition.LeaderElementOrRect
    >(null);

    const handleContextMenu = useFunction((e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (closingThrottleRef.current) return;

        const withMouse = e.button !== -1;
        const withKeyboard = !withMouse;

        if (withMouse) {
            const cursorSize = 1;

            leaderElementOrRectRef.current = {
                top: e.clientY,
                bottom: e.clientY + cursorSize,
                left: e.clientX,
                right: e.clientX + cursorSize,
                width: cursorSize,
                height: cursorSize,
            };
        }

        if (withKeyboard && isHtmlElement(e.currentTarget)) {
            leaderElementOrRectRef.current = e.currentTarget;
        }

        openOverlay();
    });

    useEventListener(leaderElementRef, 'contextmenu', handleContextMenu);

    return {
        leaderElementOrRectRef,
    };
};