import {
    mutate,
    useEventListener,
    useFunction,
    useRefManager,
} from '@lesnoypudge/utils-react';
import { Overlay, RelativelyPositioned } from '@components';
import { isHtmlElement } from '@lesnoypudge/utils-web';
import { MenuContext } from '../../context';



export namespace useContextMenuControls {
    export type Options = {
        leaderElementRef: (
            RelativelyPositioned.useRelativePosition.LeaderElementRef
        );
    };

    export type Return = Pick<
        MenuContext,
        'leaderElementOrRectRef' | 'controls'
    >;
}

export const useContextMenuControls = ({
    leaderElementRef,
}: useContextMenuControls.Options): useContextMenuControls.Return => {
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
            const cursorSize = 1;

            mutate(leaderElementOrRectRef, 'current', {
                top: e.clientY,
                bottom: e.clientY + cursorSize,
                left: e.clientX,
                right: e.clientX + cursorSize,
                width: cursorSize,
                height: cursorSize,
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