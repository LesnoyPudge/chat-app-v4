import { Overlay, Popover } from '@components';
import { useContextSelector } from '@lesnoypudge/utils-react';
import { createWithDecorator } from '@utils';
import { ContextMenuContext } from '../../context';
import { PropsWithChildren } from 'react';



const decorated = createWithDecorator(({ children }) => {
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

export const ContextMenuProvider = decorated(({
    children,
}: PropsWithChildren) => {
    const value = useContextSelector(Popover.Context);

    return (
        <ContextMenuContext.Provider value={value}>
            {children}
        </ContextMenuContext.Provider>
    );
});