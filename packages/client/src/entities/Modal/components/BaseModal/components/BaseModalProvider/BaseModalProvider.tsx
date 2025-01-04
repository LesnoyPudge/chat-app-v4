import { FC, PropsWithChildren } from 'react';
import { useModalControls } from '../../../../hooks';
import { Dialog } from '@components';
import { createVariants } from '@utils';



const animationVariants: Dialog.Provider.AnimationVariants = createVariants({
    initial: {
        opacity: 0,
        scale: 0.1,
    },
    animate: {
        opacity: 1,
        scale: 1,
    },
    exit: {
        opacity: 0,
        scale: 0.1,
        transition: {
            duration: 0.15,
            ease: 'backOut',
        },
    },
}, {
    duration: 0.35,
    ease: 'backOut',
});

export namespace BaseModalProvider {
    export type WithControls = {
        controls: useModalControls.Return;
    };

    export type Props = (
        WithControls
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
            animationVariants={animationVariants}
            withoutBackdropPointerEvents={withoutBackdropPointerEvents}
        >
            {children}
        </Dialog.Provider>
    );
};