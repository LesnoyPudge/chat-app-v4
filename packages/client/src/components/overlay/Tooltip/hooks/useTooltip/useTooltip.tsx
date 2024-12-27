import { Overlay } from '@components';
import {
    useContextProxy,
    useEventListener,
    useFunction,
    useIntersectionObserver,
    useRefManager,
} from '@lesnoypudge/utils-react';
import { useRef } from 'react';
import { useIsFocusVisible } from '@hooks';



export namespace useTooltip {
    export type Props = {
        leaderElementRef: useRefManager.RefManager<HTMLElement>;
        within?: boolean;
    };
}

export const useTooltip = ({
    leaderElementRef,
    within = false,
}: useTooltip.Props) => {
    const withKeyboardRef = useRef(false);
    const withMouseRef = useRef(false);
    const {
        isOverlayExistRef,
        setOverlay,
    } = useContextProxy(Overlay.Context);

    const changeState = useFunction(() => {
        const newState = withKeyboardRef.current || withMouseRef.current;

        setOverlay(newState);
    });

    const handleFocusIn = useFunction((e: FocusEvent) => {
        if (!leaderElementRef.current) return;
        if (e.target !== leaderElementRef.current) return;

        withKeyboardRef.current = true;
        changeState();
    });

    const handleFocusOut = useFunction((e: FocusEvent) => {
        if (!leaderElementRef.current) return;
        if (e.target !== leaderElementRef.current) return;

        withKeyboardRef.current = false;
        changeState();
    });

    const handleMouseEnter = useFunction((e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;

        withMouseRef.current = true;
        changeState();
    });

    const handleMouseLeave = useFunction(() => {
        withMouseRef.current = false;
        changeState();
    });

    useIsFocusVisible(leaderElementRef, {
        stateless: true,
        within,
        onFocus: handleFocusIn,
        onBlur: handleFocusOut,
    });

    useEventListener(leaderElementRef, 'pointerenter', handleMouseEnter);
    useEventListener(leaderElementRef, 'pointerleave', handleMouseLeave);

    useIntersectionObserver(leaderElementRef, ({ isIntersecting }) => {
        if (isIntersecting === isOverlayExistRef.current) return;
        if (!withKeyboardRef.current && !withMouseRef.current) return;

        setOverlay(isIntersecting);
    });
};