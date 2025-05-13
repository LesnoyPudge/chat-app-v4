import { AnimationPlaybackControls, MotionValue } from 'motion/react';



export namespace Types {
    export type Options = {
        isExist: boolean;
        progress: MotionValue;
        onEnter?: () => { then: AnimationPlaybackControls['then'] };
        onExit?: () => { then: AnimationPlaybackControls['then'] };
    };
}