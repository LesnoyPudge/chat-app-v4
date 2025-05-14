import {
    useEventListener,
    useFunction,
    useIntersectionObserver,
    useIsFocused,
} from '@lesnoypudge/utils-react';
import { useRef } from 'react';
import { Types } from '../types';
import { Overlay } from '@/components';



export const useTooltip = ({
    leaderElementRef,
    within = false,
}: Types.useTooltip.Props): Types.useTooltip.Return => {
    const controls = Overlay.useControls();
    const withKeyboardRef = useRef(false);
    const withMouseRef = useRef(false);

    const changeState = useFunction(() => {
        const newState = withKeyboardRef.current || withMouseRef.current;

        controls.set(newState);
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
        if (isIntersecting === controls.isOpen) return;
        if (!withKeyboardRef.current && !withMouseRef.current) return;

        controls.set(isIntersecting);
    });

    return {
        controls,
    };
};