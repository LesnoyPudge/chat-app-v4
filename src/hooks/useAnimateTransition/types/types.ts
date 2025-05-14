import { AnimationPlaybackControls, MotionValue } from 'motion/react';



export namespace Types {
    export type OnEnter = () => { then: AnimationPlaybackControls['then'] };

    export type OnExit = () => { then: AnimationPlaybackControls['then'] };

    export type Options = {
        isExist: boolean;
        progress: MotionValue;
        onEnter?: OnEnter;
        onExit?: OnExit;
    };
}