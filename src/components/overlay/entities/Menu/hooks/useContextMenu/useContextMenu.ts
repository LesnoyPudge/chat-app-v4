import {
    mutate,
    useEventListener,
    useFunction,
    useRefManager,
} from '@lesnoypudge/utils-react';
import { Overlay, RelativelyPositioned } from '@/components';
import { isHtmlElement } from '@lesnoypudge/utils-web';



type Props = Overlay.Menu.Types.useContextMenuControls.Props;

type Return = Overlay.Menu.Types.useContextMenuControls.Return;

const CURSOR_SIZE = 1;
const CURSOR_MARGIN = 2;

export const useContextMenuControls = ({
    leaderElementRef,
}: Props): Return => {
    const controls = Overlay.useControls();
    const leaderElementOrRectRef = useRefManager<
        RelativelyPositioned.useRelativePosition.LeaderElementOrRect
    >(null);

    const onContextMenu = useFunction((e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const withMouse = e.button !== -1;
        const withKeyboard = !withMouse;

        if (withMouse) {
            mutate(leaderElementOrRectRef, 'current', {
                top: e.clientY,
                bottom: e.clientY + CURSOR_SIZE + CURSOR_MARGIN,
                left: e.clientX,
                right: e.clientX + CURSOR_SIZE + CURSOR_MARGIN,
                width: CURSOR_SIZE,
                height: CURSOR_SIZE,
            });
        }

        if (withKeyboard && isHtmlElement(e.currentTarget)) {
            mutate(leaderElementOrRectRef, 'current', e.currentTarget);
        }

        controls.open();
    });

    useEventListener(leaderElementRef, 'contextmenu', onContextMenu);

    return {
        leaderElementOrRectRef,
        controls,
    };
};