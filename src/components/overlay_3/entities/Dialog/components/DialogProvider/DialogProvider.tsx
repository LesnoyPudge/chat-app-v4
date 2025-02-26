import { FC, PropsWithChildren } from 'react';
import { DialogContext } from '../../context';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { createVariants } from '@utils';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { BaseOverlay } from '../../../BaseOverlay';
import { Popover } from '../../../Popover';



export namespace DialogProvider {
    export type AnimationVariants = createVariants.BaseVariantsWithKey;

    export type OwnProps = {
        label: string;
        animationVariants?: AnimationVariants;
        backdropAnimationVariants?: AnimationVariants;
        withBackdrop?: boolean;
        withoutBackdropPointerEvents?: boolean;
    };

    export type InnerProps = (
        PropsWithChildren
        & OwnProps
    );

    export type Props = T.Simplify<(
        PropsWithChildren
        & Pick<
            BaseOverlay.Provider.Props,
            'initialState' | 'outerState' | 'onChange'
        >
        & Pick<Popover.Provider.Props, 'focused'>
        & OwnProps
    )>;
}

export const DialogProviderInner: FC<DialogProvider.InnerProps> = ({
    label,
    animationVariants,
    backdropAnimationVariants,
    withoutBackdropPointerEvents = false,
    withBackdrop = false,
    children,
}) => {
    const popover = ContextSelectable.useSelector(Popover.Context);

    const contextValue: DialogContext = {
        ...popover,
        label,
        animationVariants,
        backdropAnimationVariants,
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
        <BaseOverlay.Provider
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
        </BaseOverlay.Provider>
    );
};