import { getAnimationVariants } from '@/utils';
import { FC } from 'react';
import { Overlay } from '@/components';



const {
    animationVariants: baseDialogVariants,
} = getAnimationVariants.baseDialog();

const {
    animationVariants: baseDialogBackdropVariants,
} = getAnimationVariants.baseDialogBackdrop();

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
    return (
        <Overlay.Dialog.Provider
            {...rest}
            withBackdrop
            animationVariants={baseDialogVariants}
            backdropAnimationVariants={baseDialogBackdropVariants}
        >
            {children}
        </Overlay.Dialog.Provider>
    );
};