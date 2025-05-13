import { combinedFunction } from '@lesnoypudge/utils';
import { useBoolean } from '@lesnoypudge/utils-react';
import { MotionValue } from 'motion/react';
import { useEffect } from 'react';



export const useIsAnimating = (value: MotionValue) => {
    // const isAnimating = useSyncExternalStore(
    //     (subscribe) => {
    //         console.log('sub');
    //         return value.on('animationComplete', subscribe);
    //         // return combinedFunction(
    //         //     value.on('animationStart', subscribe),
    //         //     value.on('animationComplete', subscribe),
    //         //     value.on('animationCancel', subscribe),
    //         // );
    //     },
    //     () => {
    //         console.log('measure');
    //         return value.isAnimating();
    //     },
    // );

    // return isAnimating;

    const state = useBoolean(value.isAnimating());

    useEffect(() => combinedFunction(
        value.on('animationStart', state.setTrue),
        value.on('animationComplete', state.setFalse),
        value.on('animationCancel', state.setFalse),
    ), [state.setFalse, state.setTrue, value]);

    return state.value;
};