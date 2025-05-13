import { T } from '@lesnoypudge/types-utils-base';
import {
    AnimationPlaybackControls,
    MotionValue,
    ValueAnimationTransition,
} from 'motion/react';



export namespace Types {
    export type Style = Record<string, MotionValue>;

    export type OnEnter = () => { then: AnimationPlaybackControls['then'] };

    export type OnExit = () => { then: AnimationPlaybackControls['then'] };

    export type Options = ValueAnimationTransition<number>;

    export namespace GenericHook {
        export type Props = {
            progress: MotionValue<number>;
            extendStyle?: Style;
            extendEnterOptions?: Options;
            extendExitOptions?: Options;
        };

        export type Return = {
            onEnter: OnEnter;
            onExit: OnExit;
            style: Style;
        };

        export type Fn = (props: Props) => Return;
    }

    export namespace UsePresetCustom {
        export type Props = {
            progress: MotionValue<number>;
            style: Style;
            enterOptions?: Options;
            exitOptions?: Options;
        };

        export type Return = GenericHook.Return;

        export type Fn = (props: Props) => Return;
    }
}