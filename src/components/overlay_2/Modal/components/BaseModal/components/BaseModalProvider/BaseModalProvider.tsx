import { FC, PropsWithChildren } from 'react';
import { Dialog, Overlay } from '@components';
import { getAnimationVariants } from '@utils';



const {
    animationVariants: baseModalVariants,
} = getAnimationVariants.baseModal();

const {
    animationVariants: baseModalBackdropVariants,
} = getAnimationVariants.baseModalBackdrop();


export namespace BaseModalProvider {
    export type Props = (
        Overlay.Types.WithControls
        & Pick<
            Dialog.Provider.Props,
            'label'
            | 'withoutBackdropPointerEvents'
        >
        & PropsWithChildren
    );
}

export const BaseModalProvider: FC<BaseModalProvider.Props> = ({
    controls,
    label,
    withoutBackdropPointerEvents,
    children,
}) => {
    return (
        <Dialog.Provider
            label={label}
            focused
            onChange={controls.onChange}
            outerState={controls.isOpen}
            withBackdrop
            withoutBackdropPointerEvents={withoutBackdropPointerEvents}
            animationVariants={baseModalVariants}
            backdropAnimationVariants={baseModalBackdropVariants}
        >
            {children}
        </Dialog.Provider>
    );
};