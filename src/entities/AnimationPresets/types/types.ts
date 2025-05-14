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

    export type WithStyle = {
        style: Style;
    };

    export namespace GenericHook {
        export type Props = {
            progress: MotionValue<number>;
            extendStyle?: Style;
            extendEnterOptions?: Options;
            extendExitOptions?: Options;
        };

        export type Return = T.Simplify<(
            WithStyle
            & {
                onEnter: OnEnter;
                onExit: OnExit;
            }
        )>;

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