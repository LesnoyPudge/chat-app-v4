import { Overlay, Popover } from '@components';
import { ContextSelectable, createWithDecorator, withDisplayName } from '@lesnoypudge/utils-react';
import { ContextMenuContext } from '../../context';
import { PropsWithChildren } from 'react';



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

export const ContextMenuProvider = withDisplayName(
    'ContextMenuProvider',
    withDecorator<PropsWithChildren>(({
        children,
    }) => {
        const value = ContextSelectable.useSelector(Popover.Context);

        return (
            <ContextMenuContext.Provider value={value}>
                {children}
            </ContextMenuContext.Provider>
        );
    }),
);