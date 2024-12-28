
import { T } from '@lesnoypudge/types-utils-base/namespace';
import {
    useAnimationFrame,
    useFunction,
    useRefManager,
} from '@lesnoypudge/utils-react';
import { calculateRelativePosition, isOmittedRect } from './utils';
import { useLayoutEffect, useState } from 'react';



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

    export type LeaderElementRef = useRefManager.RefManager<
        HTMLElement
    >;

    export type LeaderElementRectRef = useRefManager.RefManager<
        OmittedRect
    >;

    export type LeaderElementOrRectRef = useRefManager.RefManager<
        LeaderElementOrRect
    >;

    export type Props = (
        Options
        & {
            followerElementRef: useRefManager.RefManager<HTMLElement>;
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
    boundsSize = 0,
    spacing = 0,
    centered = false,
    unbounded = false,
}: useRelativePosition.Props): useRelativePosition.Return => {
    const [alignment, setAlignment] = useState(preferredAlignment);

    const calculate = useFunction(() => {
        if (
            !followerElementRef.current
            || !leaderElementOrRectRef.current
        ) return;

        const leaderRect = (
            isOmittedRect(leaderElementOrRectRef.current)
                ? leaderElementOrRectRef.current
                : leaderElementOrRectRef.current.getBoundingClientRect()
        ) as useRelativePosition.OmittedRect;

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