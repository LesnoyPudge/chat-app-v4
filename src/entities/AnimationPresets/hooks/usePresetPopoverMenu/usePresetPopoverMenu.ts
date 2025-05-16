import { usePresetCustom } from '../usePresetCustom';
import { Types } from '../../types';
import { useTransform } from 'motion/react';



export const usePresetPopoverMenu: Types.GenericHook.Fn = ({
    progress,
    extendEnterOptions,
    extendExitOptions,
    extendStyle,
}) => {
    return usePresetCustom({
        progress,
        enterOptions: {
            duration: 0.25,
            ease: 'backOut',
            ...extendEnterOptions,
        },
        exitOptions: {
            duration: 0.25,
            ease: 'backOut',
            ...extendExitOptions,
        },
        style: {
            opacity: useTransform(progress, [0, 1, 2], [0, 1, 0]),
            scale: useTransform(progress, [0, 1, 2], [0.75, 1, 0.75]),
            ...extendStyle,
        },
    });
};