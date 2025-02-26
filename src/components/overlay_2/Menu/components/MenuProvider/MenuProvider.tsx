import { Overlay, Popover } from '@components';
import { ContextSelectable, createWithDecorator, withDisplayName } from '@lesnoypudge/utils-react';
import { MenuContext } from '../../context';
import { PropsWithChildren } from 'react';
import { T } from '@lesnoypudge/types-utils-base/namespace';



const { withDecorator } = createWithDecorator(({ children }) => {
    return (
        <Overlay.Provider>
            <Popover.Provider
                blockable
                blocking
                closeOnClickOutside
                closeOnEscape
                focused
            >
                {children}
            </Popover.Provider>
        </Overlay.Provider>
    );
});

export namespace MenuProvider {
    export type Props = T.Simplify<(
        PropsWithChildren
        & Pick<
            MenuContext,
            'preferredAlignment'
            | 'leaderElementOrRectRef'
            | 'spacing'
            | 'label'
            | 'controls'
            | 'animationVariants'
            | 'centered'
        >
    )>;
}

export const MenuProvider = withDisplayName(
    'MenuProvider',
    withDecorator<MenuProvider.Props>(({
        children,
        ...rest
    }) => {
        const popover = ContextSelectable.useSelector(Popover.Context);

        return (
            <MenuContext.Provider value={{
                ...popover,
                ...rest,
            }}>
                {children}
            </MenuContext.Provider>
        );
    }),
);