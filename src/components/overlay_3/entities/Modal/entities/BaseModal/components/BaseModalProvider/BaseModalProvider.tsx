import { FC, PropsWithChildren } from 'react';
import { getAnimationVariants } from '@utils';
import { Overlay } from '@components';



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
            Overlay.Dialog.Provider.Props,
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
        <Overlay.Dialog.Provider
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
        </Overlay.Dialog.Provider>
    );
};