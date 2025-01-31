import { createWithDecorator } from '@utils';
import { BaseModalProvider, BaseModalWrapper } from '../components';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { withDisplayName } from '@lesnoypudge/utils-react';


type BaseProps = T.Except<
    BaseModalProvider.Props,
    'controls'
>;

type InnerProps = Pick<BaseModalProvider.Props, 'controls'>;

export const createDecorator = (
    displayName: string,
    props: BaseProps,
) => {
    const { withDecorator } = createWithDecorator<InnerProps>(({
        children,
        controls,
    }) => {
        return (
            <BaseModalProvider
                controls={controls}
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