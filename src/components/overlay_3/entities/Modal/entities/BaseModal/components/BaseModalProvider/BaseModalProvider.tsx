import { PropsWithChildren } from 'react';
import { getAnimationVariants, withDisplayNameAndDecorator } from '@utils';
import { Overlay } from '@components';
import { ContextSelectable } from '@lesnoypudge/utils-react';



const {
    animationVariants: baseModalVariants,
} = getAnimationVariants.baseModal();

const {
    animationVariants: baseModalBackdropVariants,
} = getAnimationVariants.baseModalBackdrop();

const { withDecorator } = withDisplayNameAndDecorator<
    Overlay.Modal.Base.Types.Provider.Props
>(
    'BaseModalProvider',
    ({
        controls,
        label,
        children,
    }) => {
        return (
            <Overlay.Dialog.Provider
                controls={controls}
                label={label}
                animationVariants={baseModalVariants}
                backdropAnimationVariants={baseModalBackdropVariants}
                withBackdrop
            >
                {children}
            </Overlay.Dialog.Provider>
        );
    },
);

export const BaseModalProvider = withDecorator<PropsWithChildren>(({
    children,
}) => {
    const dialog = ContextSelectable.useProxy(Overlay.Dialog.Context);

    return (
        <Overlay.Modal.Base.Context.Provider value={dialog}>
            {children}
        </Overlay.Modal.Base.Context.Provider>
    );
});