import { FC } from 'react';
import { DialogContext } from '../../context';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Overlay } from '@/components';



export const DialogProviderInner: FC<
    Overlay.Dialog.Types.Provider.InnerProps
> = ({
    label,
    animationVariants,
    backdropAnimationVariants,
    withBackdrop = false,
    children,
}) => {
    const popover = ContextSelectable.useSelector(
        Overlay.Popover.Context,
    );

    const contextValue: Overlay.Dialog.Types.Context = {
        ...popover,
        label,
        animationVariants,
        backdropAnimationVariants,
        withBackdrop,
    };

    return (
        <DialogContext.Provider value={contextValue}>
            {children}
        </DialogContext.Provider>
    );
};

export const DialogProvider: FC<Overlay.Dialog.Types.Provider.Props> = ({
    children,
    controls,
    ...rest
}) => {
    return (
        <Overlay.BaseOverlay.Provider
            controls={controls}
        >
            <Overlay.Popover.Provider
                blockable
                blocking
                closeOnClickOutside
                closeOnEscape
                focused
            >
                <DialogProviderInner {...rest}>
                    {children}
                </DialogProviderInner>
            </Overlay.Popover.Provider>
        </Overlay.BaseOverlay.Provider>
    );
};