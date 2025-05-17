import { Button } from '@/components';
import { useAnimateTransition } from '@/hooks';
import { Motion } from '@/libs';
import { If } from '@lesnoypudge/react-if';
import { useBoolean } from '@lesnoypudge/utils-react';
import { useMotionValue } from 'motion/react';
import { FC } from 'react';
import { AnimationPresets } from '@/entities';



export const AnimationPresetTest: FC = () => {
    const state = useBoolean(false);

    const progress = useMotionValue(2);

    const { style, onEnter, onExit } = AnimationPresets.useBaseDialog({
        progress,
    });

    const isPresent = useAnimateTransition({
        isExist: state.value,
        progress,
        onEnter,
        onExit,
    });

    return (
        <div className='relative size-full'>
            <Button onLeftClick={state.toggle}>
                <>toggle: {String(state.value)}</>
            </Button>

            <If condition={isPresent}>
                <Motion.div
                    className='absolute left-1/2 top-1/2 bg-black'
                    style={style}
                >
                    <>animated</>
                </Motion.div>
            </If>
        </div>
    );
};