
import { T } from '@lesnoypudge/types-utils-base/namespace';
import {
    useAnimationFrame,
    useFunction,
    useRefManager,
    useUniqueState,
} from '@lesnoypudge/utils-react';
import { calculateRelativePosition, isOmittedRect } from './utils';
import { useLayoutEffect } from 'react';



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

    export type WithAlignment = {
        alignment: Alignment;
    };

    export type RelativePositionOptions = {
        preferredAlignment: Alignment;
        swappableAlignment?: boolean;
        boundsSize?: number;
        spacing?: number;
        centered?: boolean;
        unbounded?: boolean;
    };

    export type Props = (
        RelativePositionOptions
        & {
            followerElementRef: useRefManager.RefManager<HTMLElement>;
            leaderElementOrRectRef: useRefManager.RefManager<
                HTMLElement | OmittedRect
            >;
        }
    );
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
}: useRelativePosition.Props): useRelativePosition.WithAlignment => {
    const [alignment, setAlignment] = useUniqueState(preferredAlignment);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useLayoutEffect(calculate, []);

    useAnimationFrame(calculate, true);

    return {
        alignment,
    };
};