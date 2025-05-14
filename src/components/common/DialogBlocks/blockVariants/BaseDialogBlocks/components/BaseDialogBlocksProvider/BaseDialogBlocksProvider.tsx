import { FC } from 'react';
import { Overlay } from '@/components';
import { AnimationPresets } from '@/entities';
import { useMotionValue } from 'motion/react';



export namespace BaseDialogBlocksProvider {
    export type Props = Pick<
        Overlay.Dialog.Types.Provider.Props,
        'label'
        | 'controls'
        | 'children'
    >;
}

export const BaseDialogBlocksProvider: FC<BaseDialogBlocksProvider.Props> = ({
    children,
    ...rest
}) => {
    const progress = useMotionValue(2);

    const { onEnter, onExit, style } = AnimationPresets.useBaseDialog({
        progress,
    });

    const { style: backdropStyle } = AnimationPresets.useBaseDialogBackdrop({
        progress,
    });

    return (
        <Overlay.Dialog.Provider
            {...rest}
            withBackdrop
            backdropStyle={backdropStyle}
            dialogStyle={style}
            onEnter={onEnter}
            onExit={onExit}
            progress={progress}
        >
            {children}
        </Overlay.Dialog.Provider>
    );
};