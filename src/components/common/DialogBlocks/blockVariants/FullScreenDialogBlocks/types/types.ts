import { T } from '@lesnoypudge/types-utils-base/namespace';
import { MobileMenu } from '@/components';
import { MotionValue } from 'motion/react';



export namespace Types {
    export type Context = T.Simplify<(
        MobileMenu.Types.Context
        & {
            isShaking: boolean;
            resetShakeStacks: VoidFunction;
            triggerScreenShake: VoidFunction;
            shakeX: MotionValue<string>;
            shakeY: MotionValue<string>;
        }
    )>;
}