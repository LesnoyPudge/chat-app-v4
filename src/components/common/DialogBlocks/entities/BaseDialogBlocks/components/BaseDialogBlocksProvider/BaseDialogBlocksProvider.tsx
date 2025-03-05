import { getAnimationVariants } from '@/utils';
import { FC } from 'react';
import { Overlay } from '@/components';



const {
    animationVariants: baseModalVariants,
} = getAnimationVariants.baseModal();

const {
    animationVariants: baseModalBackdropVariants,
} = getAnimationVariants.baseModalBackdrop();

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
            animationVariants={baseModalVariants}
            backdropAnimationVariants={baseModalBackdropVariants}
        >
            {children}
        </Overlay.Dialog.Provider>
    );
};