import { FC, PropsWithChildren } from 'react';
import { DialogContext } from '../../context';
import { useConst } from '@lesnoypudge/utils-react';
import { getId } from '@lesnoypudge/utils';
import { Variant } from 'motion/react';
import { createVariants } from '@utils';
import { Overlay } from '@components/overlay/Overlay';
import { Popover } from '@components/overlay/Popover';



const config: Variant = {
    transition: {
        duration: 0.35,
        ease: 'easeOut',
    },
};

const defaultVariants: DialogProvider.AnimationVariants = createVariants({
    initial: {
        opacity: 0,
        ...config,
    },
    animate: {
        opacity: 1,
        ...config,
    },
    exit: {
        opacity: 0,
        ...config,
    },
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

    export type Props = (
        PropsWithChildren
        & Pick<Overlay.Provider.Props, 'initialState'>
        & OwnProps
    );
}

export const DialogProvider: FC<DialogProvider.Props> = ({
    label,
    animationVariants = defaultVariants,
    withoutBackdropPointerEvents = false,
    withBackdrop = false,
    initialState,
    children,
}) => {
    const id = useConst(() => getId());

    const contextValue: DialogContext = {
        id,
        describedBy: `describedBy-${id}`,
        label,
        animationVariants,
        withBackdrop,
        withoutBackdropPointerEvents,
    };

    return (
        <Overlay.Provider initialState={initialState}>
            <Popover.Provider
                blockable
                blocking
                closeOnClickOutside
                closeOnEscape
                focused
            >
                <DialogContext.Provider value={contextValue}>
                    {children}
                </DialogContext.Provider>
            </Popover.Provider>
        </Overlay.Provider>
    );
};