import { withDisplayName } from '@lesnoypudge/utils-react';
import { ComponentProps, PropsWithChildren, ReactNode } from 'react';



export const createWithDecorator = (
    Decorator: (props: PropsWithChildren) => ReactNode,
) => {
    const NamedDecorator = withDisplayName('Decorator', Decorator);

    const withDecorator = <
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _Component extends (props: any) => ReactNode,
    >(
        Component: _Component,
    ) => {
        const Decorated = (props: ComponentProps<_Component>) => {
            return (
                <NamedDecorator>
                    <Component {...props}/>
                </NamedDecorator>
            );
        };

        return Decorated;
    };

    return withDecorator;
};