import { Button } from '@/components';
import { useAnimateTransition, useIsAnimating } from '@/hooks';
import { Motion } from '@/libs';
import { If } from '@lesnoypudge/react-if';
import {
    autoBind,
    combinedFunction,
    invariant,
    ListenerStore,
    never,
    noop,
} from '@lesnoypudge/utils';
import {
    useBoolean,
    useConst,
    useForceUpdate,
    useFunction,
    useIsMounted,
    useLatest,
    usePrevious,
    usePropsChange,
} from '@lesnoypudge/utils-react';
import {
    animate,
    AnimatePresence,
    AnimationPlaybackControls,
    MotionValue,
    useMotionValue,
    // usePresence,
    useTransform,
} from 'motion/react';
import {
    FC,
    PropsWithChildren,
    useEffect,
    useMemo,
    useRef,
    useSyncExternalStore,
} from 'react';



export const MotionTest: FC = () => {
    const state = useBoolean(false);

    const progress = useMotionValue(0);

    // useEffect(() => {
    //     animate(progress, state.value ? 1 : 0, { duration: 3 });
    // }, [progress, state.value]);

    const x = useTransform(progress, [0, 1], [0.5, 1]);

    const isAnimating = useIsAnimating(progress);

    const exit = () => animate(progress, 0, { duration: 3 });
    const enter = () => animate(progress, 1, { duration: 3 });

    const isPresent = useAnimateTransition({
        isExist: state.value,
        onExit: exit,
        onEnter: enter,
        progress,
    });

    useEffect(() => {
        console.log({ isPresent });
    });

    const content = (
        <Motion.div
            className='p-4'
            style={{
                opacity: x,
            }}
        >
            {x}
        </Motion.div>
    );

    return (
        <div className='relative h-[500px]'>
            <Button
                onLeftClick={state.toggle}
                stylingPreset='brand'
                size='big'
            >
                {state.value ? 'active' : 'inactive'}
            </Button>

            <div>
                <>isAnimating: {String(isAnimating)}</>
            </div>

            <If condition={isPresent}>
                <div>
                    <div>first</div>

                    <div>{content}</div>
                </div>
            </If>
        </div>
    );
};