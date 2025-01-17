import { Overlay, Popover } from '@components';
import { useContextSelector, withDisplayName } from '@lesnoypudge/utils-react';
import { createWithDecorator } from '@utils';
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
        const value = useContextSelector(Popover.Context);

        return (
            <ContextMenuContext.Provider value={value}>
                {children}
            </ContextMenuContext.Provider>
        );
    }),
);