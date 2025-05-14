import { RelativelyPositioned } from '@/components';
import { AnimationPresets } from '@/entities';
import { useMotionValue, useTransform } from 'motion/react';



export const useTooltipAnimation = (
    alignment: RelativelyPositioned.useRelativePosition.Alignment,
) => {
    const progress = useMotionValue(2);

    const getY = () => {
        return (
            alignment === 'top'
                ? -15
                : alignment === 'bottom'
                    ? 15
                    : 0
        );
    };

    const getX = () => {
        return (
            alignment === 'left'
                ? -15
                : alignment === 'right'
                    ? 15
                    : 0
        );
    };

    const opacity = useTransform(progress, [0, 1, 2], [0, 1, 0]);
    const translateX = useTransform(progress, [0, 1, 2], [getX(), 0, getX()]);
    const translateY = useTransform(progress, [0, 1, 2], [getY(), 0, getY()]);

    const { onEnter, onExit, style } = AnimationPresets.useCustom({
        progress,
        style: {
            opacity,
            translateX,
            translateY,
        },
        enterOptions: {
            duration: 0.15,
        },
        exitOptions: {
            duration: 0.15,
        },
    });

    return {
        onEnter,
        onExit,
        style,
        progress,
    };
};