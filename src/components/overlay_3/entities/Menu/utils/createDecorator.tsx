import { T } from '@lesnoypudge/types-utils-base/namespace';
import { MenuProvider, MenuWrapper } from '../components';
import { createWithDecorator, withDisplayName } from '@lesnoypudge/utils-react';



type BaseProps = T.Except<
    MenuProvider.Props,
    'controls'
>;

type InnerProps = Pick<MenuProvider.Props, 'controls'>;

export const createDecorator = (
    displayName: string,
    props: BaseProps,
) => {
    const { withDecorator } = createWithDecorator<InnerProps>(({
        children,
        ...innerProps
    }) => {
        return (
            <MenuProvider
                {...innerProps}
                {...props}
            >
                <MenuWrapper>
                    {children}
                </MenuWrapper>
            </MenuProvider>
        );
    });

    const combined: typeof withDecorator = (component) => {
        return withDisplayName(displayName, withDecorator(component));
    };

    return {
        withDecorator: combined,
    };
};