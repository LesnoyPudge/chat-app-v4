import { T } from '@lesnoypudge/types-utils-base/namespace';
import {
    useAnimationFrame,
    useFunction,
    useRefManager,
} from '@lesnoypudge/utils-react';
import { calculateRelativePosition } from './utils';
import { useLayoutEffect, useState } from 'react';
import { isHtmlElement } from '@lesnoypudge/utils-web';



export namespace useRelativePosition {
    export type OmittedRect = T.Simplify<T.Writable<Pick<
        DOMRect,
        'bottom' | 'height' | 'left' | 'right' | 'top' | 'width'
    >>>;

    export type Alignment = 'top' | 'bottom' | 'left' | 'right';

    export type Position = {
        top: number;
        left: number;
    };

    export type WithRects = {
        followerRect: OmittedRect;
        leaderRect: OmittedRect;
    };

    export type Options = {
        preferredAlignment: Alignment;
        swappableAlignment?: boolean;
        boundsSize?: number;
        spacing?: number;
        centered?: boolean;
        unbounded?: boolean;
    };

    export type LeaderElementOrRect = HTMLElement | OmittedRect;

    export type LeaderElementRef = useRefManager.NullableRefManager<
        HTMLElement
    >;

    export type LeaderElementRectRef = useRefManager.NullableRefManager<
        OmittedRect
    >;

    export type LeaderElementOrRectRef = useRefManager.NullableRefManager<
        LeaderElementOrRect
    >;

    export type Props = (
        Options
        & {
            followerElementRef: useRefManager.NullableRefManager<HTMLElement>;
            leaderElementOrRectRef: LeaderElementOrRectRef;
        }
    );

    export type Return = {
        alignment: Alignment;
    };
}

export const useRelativePosition = ({
    preferredAlignment,
    followerElementRef,
    leaderElementOrRectRef,
    swappableAlignment = false,
    boundsSize = 20,
    spacing = 0,
    centered = false,
    unbounded = false,
}: useRelativePosition.Props): useRelativePosition.Return => {
    const [alignment, setAlignment] = useState(preferredAlignment);

    const calculate = useFunction(() => {
        if (!followerElementRef.current) return;
        if (!leaderElementOrRectRef.current) return;

        const leaderRect = (
            isHtmlElement(leaderElementOrRectRef.current)
                ? leaderElementOrRectRef.current.getBoundingClientRect()
                : leaderElementOrRectRef.current
        );

        const {
            alignment: newAlignment,
            left,
            top,
        } = calculateRelativePosition({
            followerRect: followerElementRef.current.getBoundingClientRect(),
            leaderRect,
            boundsSize,
            centered,
            preferredAlignment,
            spacing,
            swappableAlignment,
            unbounded,
        });

        if (alignment !== newAlignment) setAlignment(newAlignment);

        const follower = followerElementRef.current;
        const transformValue = `translate(${left}px, ${top}px)`;

        if (follower.style.transform === transformValue) return;

        follower.style.transform = transformValue;
    });

    useLayoutEffect(calculate, [calculate]);

    useAnimationFrame(calculate, true);

    return {
        alignment,
    };
};