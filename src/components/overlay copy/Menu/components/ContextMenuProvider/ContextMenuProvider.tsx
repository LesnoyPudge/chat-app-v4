import { Overlay, Popover } from '@components';
import { ContextSelectable, createWithDecorator, withDisplayName } from '@lesnoypudge/utils-react';
import { ContextMenuContext } from '../../context';
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

export namespace ContextMenuProvider {
    export type Props = T.Simplify<(
        PropsWithChildren
        & Pick<
            ContextMenuContext,
            'preferredAlignment'
            | 'leaderElementOrRectRef'
            | 'spacing'
            | 'label'
            | 'controls'
        >
    )>;
}

export const ContextMenuProvider = withDisplayName(
    'ContextMenuProvider',
    withDecorator<ContextMenuProvider.Props>(({
        children,
        ...rest
    }) => {
        const popover = ContextSelectable.useSelector(Popover.Context);

        return (
            <ContextMenuContext.Provider value={{
                ...popover,
                ...rest,
            }}>
                {children}
            </ContextMenuContext.Provider>
        );
    }),
);