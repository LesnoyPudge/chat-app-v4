import { useFunction } from '@lesnoypudge/utils-react';
import { Types } from '../../types';
import { animate } from 'motion/react';



export const usePresetCustom: Types.UsePresetCustom.Fn = ({
    progress,
    style,
    enterOptions,
    exitOptions,
}) => {
    const onEnter: Types.OnEnter = useFunction(() => {
        return animate(progress, 1, enterOptions);
    });

    const onExit: Types.OnExit = useFunction(() => {
        return animate(progress, 0, exitOptions).then(() => {
            // eslint-disable-next-line promise/always-return
            if (progress.isAnimating()) return;

            progress.set(2);
        });
    });

    return {
        onEnter,
        onExit,
        style,
    };
};