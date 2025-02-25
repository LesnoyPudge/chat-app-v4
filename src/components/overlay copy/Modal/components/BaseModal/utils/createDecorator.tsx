import { BaseModalProvider, BaseModalWrapper } from '../components';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { createWithDecorator, withDisplayName } from '@lesnoypudge/utils-react';



type BaseProps = T.Except<
    BaseModalProvider.Props,
    'controls'
>;

type InnerProps = Omit<BaseModalProvider.Props, keyof BaseProps>;

export const createDecorator = (
    displayName: string,
    props: BaseProps,
) => {
    const { withDecorator } = createWithDecorator<InnerProps>(({
        children,
        ...innerProps
    }) => {
        return (
            <BaseModalProvider
                {...innerProps}
                {...props}
            >
                <BaseModalWrapper>
                    {children}
                </BaseModalWrapper>
            </BaseModalProvider>
        );
    });

    const combined: typeof withDecorator = (component) => {
        return withDisplayName(displayName, withDecorator(component));
    };

    return {
        withDecorator: combined,
    };
};