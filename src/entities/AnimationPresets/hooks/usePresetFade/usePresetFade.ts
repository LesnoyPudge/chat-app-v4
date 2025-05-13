import { usePresetCustom } from '../usePresetCustom';
import { Types } from '../../types';
import { useTransform } from 'motion/react';



export const usePresetFade: Types.GenericHook.Fn = ({
    progress,
    extendStyle,
    extendEnterOptions,
    extendExitOptions,
}) => {
    return usePresetCustom({
        progress,
        enterOptions: {
            duration: 0.125,
            ease: 'backOut',
            ...extendEnterOptions,
        },
        exitOptions: {
            duration: 0.125,
            ease: 'backOut',
            ...extendExitOptions,
        },
        style: {
            opacity: useTransform(progress, [0, 1, 2], [0, 1, 0]),
            ...extendStyle,
        },
    });
};