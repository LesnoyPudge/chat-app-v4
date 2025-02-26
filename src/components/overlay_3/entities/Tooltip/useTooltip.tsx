import { BaseOverlay } from '../BaseOverlay';
import {
    ContextSelectable,
    useEventListener,
    useFunction,
    useIntersectionObserver,
    useIsFocused,
    useRefManager,
} from '@lesnoypudge/utils-react';
import { useRef } from 'react';



export namespace useTooltip {
    export type Props = {
        leaderElementRef: useRefManager.NullableRefManager<HTMLElement>;
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
    } = ContextSelectable.useProxy(BaseOverlay.Context);

    const changeState = useFunction(() => {
        const newState = withKeyboardRef.current || withMouseRef.current;

        setOverlay(newState);
    });

    const handleFocusIn = useFunction((target: Element) => {
        if (!leaderElementRef.current) return;
        if (target !== leaderElementRef.current) return;

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

    useIsFocused(leaderElementRef, {
        stateless: true,
        within,
        visible: true,
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