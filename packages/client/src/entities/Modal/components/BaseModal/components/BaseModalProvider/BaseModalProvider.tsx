import { FC, PropsWithChildren } from 'react';
import { useModalControls } from '../../../../hooks';
import { Dialog } from '@components';



export namespace BaseModalProvider {
    export type WithControls = {
        controls: useModalControls.Return;
    };

    export type Props = (
        WithControls
        & Pick<
            Dialog.Provider.Props,
            'label'
        >
        & PropsWithChildren
        & Pick<
            Dialog.Provider.Props,
            'animationVariants'
            | 'withoutBackdropPointerEvents'
        >
    );
}

export const BaseModalProvider: FC<BaseModalProvider.Props> = ({
    controls,
    label,
    animationVariants,
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
            animationVariants={animationVariants}
            withoutBackdropPointerEvents={withoutBackdropPointerEvents}
        >
            {children}
        </Dialog.Provider>
    );
};