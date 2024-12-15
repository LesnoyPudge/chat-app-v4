import { FC, PropsWithChildren } from 'react';
import { DialogContext } from '../../context';
import { useConst, useContextSelector } from '@lesnoypudge/utils-react';
import { getId } from '@lesnoypudge/utils';
import { Variant } from 'motion/react';
import { createVariants } from '@utils';
import { Overlay, Popover } from '@components';



const defaultVariants: DialogProvider.AnimationVariants = createVariants({
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
}, {
    duration: 0.35,
    ease: 'easeOut',
});

export namespace DialogProvider {
    export type AnimationVariants = ReturnType<typeof createVariants<{
        initial: Variant;
        animate: Variant;
        exit: Variant;
    }>>;

    export type OwnProps = {
        label: string;
        animationVariants?: AnimationVariants;
        withBackdrop?: boolean;
        withoutBackdropPointerEvents?: boolean;
    };

    export type InnerProps = (
        PropsWithChildren
        & OwnProps
    );

    export type Props = (
        PropsWithChildren
        & Pick<Overlay.Provider.Props, 'initialState'>
        & Pick<Popover.Provider.Props, 'focused'>
        & OwnProps
    );
}

export const DialogProviderInner: FC<DialogProvider.InnerProps> = ({
    label,
    animationVariants = defaultVariants,
    withoutBackdropPointerEvents = false,
    withBackdrop = false,
    children,
}) => {
    const popover = useContextSelector(Popover.Context);
    const id = useConst(() => getId());

    const contextValue: DialogContext = {
        ...popover,
        id,
        describedBy: `describedBy-${id}`,
        label,
        animationVariants,
        withBackdrop,
        withoutBackdropPointerEvents,
    };

    return (
        <DialogContext.Provider value={contextValue}>
            {children}
        </DialogContext.Provider>
    );
};

export const DialogProvider: FC<DialogProvider.Props> = ({
    focused,
    initialState,
    children,
    ...rest
}) => {
    return (
        <Overlay.Provider initialState={initialState}>
            <Popover.Provider
                blockable
                blocking
                closeOnClickOutside
                closeOnEscape
                focused={focused}
            >
                <DialogProviderInner {...rest}>
                    {children}
                </DialogProviderInner>
            </Popover.Provider>
        </Overlay.Provider>
    );
};