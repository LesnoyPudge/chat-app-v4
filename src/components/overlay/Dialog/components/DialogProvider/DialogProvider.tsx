import { FC, PropsWithChildren } from 'react';
import { DialogContext } from '../../context';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Overlay, Popover } from '@components';
import { getAnimationVariants } from '@utils';



const defaultVariants = getAnimationVariants.baseModal().animationVariants;

export namespace DialogProvider {
    export type AnimationVariants = typeof defaultVariants;

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
        & Pick<
            Overlay.Provider.Props,
            'initialState' | 'outerState' | 'onChange'
        >
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
    const popover = ContextSelectable.useSelector(Popover.Context);

    const contextValue: DialogContext = {
        ...popover,
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
    outerState,
    onChange,
    ...rest
}) => {
    return (
        <Overlay.Provider
            initialState={initialState}
            outerState={outerState}
            onChange={onChange}
        >
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