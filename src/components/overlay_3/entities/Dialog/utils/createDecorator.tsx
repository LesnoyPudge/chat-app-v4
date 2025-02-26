import { T } from '@lesnoypudge/types-utils-base/namespace';
import { DialogProvider, DialogWrapper } from '../components';
import { createWithDecorator, withDisplayName } from '@lesnoypudge/utils-react';
import { Overlay } from '@components';



type BaseProps = T.Except<
    DialogProvider.Props,
    'initialState' | 'outerState' | 'onChange'
>;

type InnerProps = Overlay.Types.WithControls;

export const createDecorator = (
    displayName: string,
    props: BaseProps,
) => {
    const { withDecorator } = createWithDecorator<InnerProps>(({
        children,
        ...innerProps
    }) => {
        return (
            <DialogProvider
                {...innerProps}
                {...props}
            >
                <DialogWrapper>
                    {children}
                </DialogWrapper>
            </DialogProvider>
        );
    });

    const combined: typeof withDecorator = (component) => {
        return withDisplayName(displayName, withDecorator(component));
    };

    return {
        withDecorator: combined,
    };
};