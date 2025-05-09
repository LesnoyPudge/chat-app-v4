import { MotionValue } from 'motion/react';
import { useSyncExternalStore } from 'react';



export const useIsAnimating = (value: MotionValue) => {
    const isAnimating = useSyncExternalStore(
        (subscribe) => value.on('change', subscribe),
        value.isAnimating,
    );

    return isAnimating;
};