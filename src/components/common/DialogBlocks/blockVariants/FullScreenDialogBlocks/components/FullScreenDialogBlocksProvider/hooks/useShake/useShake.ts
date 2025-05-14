import { coinFlip, noop } from '@lesnoypudge/utils';
import { useFunction, useThrottle } from '@lesnoypudge/utils-react';
import {
    animate,
    useMotionValue,
    useReducedMotion,
    useTransform,
} from 'motion/react';
import { useRef } from 'react';
import { Types } from '../../../../types';



type Return = Pick<
    Types.Context,
    'isShaking'
    | 'resetShakeStacks'
    | 'triggerScreenShake'
    | 'shakeX'
    | 'shakeY'
>;

const SHAKE = {
    DECAY_DELAY: 2_000,
    MULTIPLIER: 5,
    TIME_MULTIPLAYER: 50,
    MIN_STACKS: 1,
    MAX_STACKS: 5,
    STACK_STEP: 1,
};

export const useShake = (): Return => {
    const shakeStackRef = useRef(SHAKE.MIN_STACKS);
    const isMotionReduced = useReducedMotion();
    const { isThrottling, throttle } = useThrottle();
    const decayTimerIdRef = useRef<number>();
    const progress = useMotionValue(0);
    const windowShakeValue = useTransform(
        progress,
        [0, 0.01, 1],
        [0, 1, 0],
    );

    const resetShakeStacks = useFunction(() => {
        shakeStackRef.current = SHAKE.MIN_STACKS;
    });

    const beginDecayTimer = () => {
        clearInterval(decayTimerIdRef.current);

        decayTimerIdRef.current = setInterval(() => {
            shakeStackRef.current = Math.max(
                SHAKE.MIN_STACKS,
                shakeStackRef.current - 1,
            );
        }, SHAKE.DECAY_DELAY);
    };

    const triggerScreenShake = useFunction(() => {
        if (isMotionReduced) return;

        throttle(noop, 2_000)();

        const durationMs = (
            (shakeStackRef.current * SHAKE.TIME_MULTIPLAYER)
            / 1_000
        );

        progress.stop();
        progress.set(0);

        void animate(progress, 1, {
            duration: durationMs,
            ease: 'linear',
        }).then(() => {
            if (progress.isAnimating()) return;

            progress.jump(0);
        });

        shakeStackRef.current = Math.min(
            shakeStackRef.current + SHAKE.STACK_STEP,
            SHAKE.MAX_STACKS,
        );

        beginDecayTimer();
    });

    const transformShakeValue = (value: number) => {
        const direction = coinFlip() ? 1 : -1;
        const result = Math.ceil((
            Math.ceil(value)
            * SHAKE.MULTIPLIER
            * (shakeStackRef.current / 2)
            * direction
        ));

        return `${result}px`;
    };

    const shakeX = useTransform(windowShakeValue, transformShakeValue);

    const shakeY = useTransform(windowShakeValue, transformShakeValue);

    return {
        isShaking: isThrottling,
        resetShakeStacks,
        triggerScreenShake,
        shakeX,
        shakeY,
    };
};