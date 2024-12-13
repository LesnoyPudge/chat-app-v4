/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { clamp } from '@lesnoypudge/utils';
import { useRelativePosition } from '../useRelativePosition';
import { T } from '@lesnoypudge/types-utils-base/namespace';



type Props = (
    T.StrictOmit<
        Required<useRelativePosition.Props>,
        'followerElementRef' | 'leaderElementOrRectRef'
    >
    & useRelativePosition.WithRects
);

type Return = (
    useRelativePosition.Position
    & useRelativePosition.Return
);

const UNBOUND_SIZE = 9_999;
const UNBOUND_SIZE_NEGATIVE = -UNBOUND_SIZE;

export const calculateRelativePosition = ({
    followerRect,
    leaderRect,
    preferredAlignment,
    boundsSize,
    centered,
    spacing,
    swappableAlignment,
    unbounded,
}: Props): Return => {
    const centering = {
        vertical: (
            centered
                ? (followerRect.height - leaderRect.height) / 2
                : 0
        ),
        horizontal: (
            centered
                ? (followerRect.width - leaderRect.width) / 2
                : 0
        ),
    };

    const minBound = window.innerHeight - boundsSize;

    const bounds = {
        top: unbounded ? UNBOUND_SIZE_NEGATIVE : boundsSize,
        bottom: unbounded ? UNBOUND_SIZE : minBound - followerRect.height,
        left: unbounded ? UNBOUND_SIZE_NEGATIVE : boundsSize,
        right: unbounded ? UNBOUND_SIZE : minBound - followerRect.width,
    };

    const unboundedPositions = {
        top: {
            top: leaderRect.top - followerRect.height - spacing,
            left: leaderRect.left - centering.horizontal,
        },
        bottom: {
            top: leaderRect.bottom + spacing,
            left: leaderRect.left - centering.horizontal,
        },
        left: {
            top: leaderRect.top - centering.vertical,
            left: leaderRect.left - followerRect.width - spacing,
        },
        right: {
            top: leaderRect.top - centering.vertical,
            left: leaderRect.right + spacing,
        },
    };

    const positions = {
        top: {
            top: clamp(
                bounds.top, unboundedPositions.top.top, bounds.bottom,
            ),
            left: clamp(
                bounds.left, unboundedPositions.top.left, bounds.right,
            ),
        },
        bottom: {
            top: clamp(
                bounds.top, unboundedPositions.bottom.top, bounds.bottom,
            ),
            left: clamp(
                bounds.left, unboundedPositions.bottom.left, bounds.right,
            ),
        },
        left: {
            top: clamp(
                bounds.top, unboundedPositions.left.top, bounds.bottom,
            ),
            left: clamp(
                bounds.left, unboundedPositions.left.left, bounds.right,
            ),
        },
        right: {
            top: clamp(
                bounds.top, unboundedPositions.right.top, bounds.bottom,
            ),
            left: clamp(
                bounds.left, unboundedPositions.right.left, bounds.right,
            ),
        },
    };

    const defaultResult: Return = {
        ...positions[preferredAlignment],
        alignment: preferredAlignment,
    };

    if (!swappableAlignment) return defaultResult;

    const availableAlignments = {
        top: unboundedPositions.top.top > bounds.top,
        bottom: unboundedPositions.bottom.top < bounds.bottom,
        left: unboundedPositions.left.left > bounds.left,
        right: unboundedPositions.right.left < bounds.right,
    };

    if (availableAlignments[preferredAlignment]) return defaultResult;

    const noSpaceAvailable = (
        !availableAlignments.top
        && !availableAlignments.bottom
        && !availableAlignments.left
        && !availableAlignments.right
    );

    if (noSpaceAvailable) return defaultResult;

    const result: Record<'top' | 'bottom' | 'left' | 'right', Return> = {
        top: {
            alignment: 'top',
            ...positions.top,
        },
        bottom: {
            alignment: 'bottom',
            ...positions.bottom,
        },
        left: {
            alignment: 'left',
            ...positions.left,
        },
        right: {
            alignment: 'right',
            ...positions.right,
        },
    };

    const alternativeAlignmentOptions = {
        top: (
            (availableAlignments.bottom && result.bottom)
            || (availableAlignments.left && result.left)
            || (availableAlignments.right && result.right)
            || result.top
        ),
        bottom: (
            (availableAlignments.top && result.top)
            || (availableAlignments.left && result.left)
            || (availableAlignments.right && result.right)
            || result.bottom
        ),
        left: (
            (availableAlignments.right && result.right)
            || (availableAlignments.top && result.top)
            || (availableAlignments.bottom && result.bottom)
            || result.left
        ),
        right: (
            (availableAlignments.left && result.left)
            || (availableAlignments.top && result.top)
            || (availableAlignments.bottom && result.bottom)
            || result.right
        ),
    };

    return alternativeAlignmentOptions[preferredAlignment];
};