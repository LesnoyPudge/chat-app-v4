import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Overlay } from '@/components';
import { MenuContext } from '../../context';
import { withDisplayNameAndDecorator } from '@/utils';



const { withDecorator } = withDisplayNameAndDecorator(
    'MenuProvider',
    ({ children }) => {
        return (
            <Overlay.BaseOverlay.Provider>
                <Overlay.Popover.Provider
                    blockable
                    blocking
                    closeOnClickOutside
                    closeOnEscape
                    focused
                >
                    {children}
                </Overlay.Popover.Provider>
            </Overlay.BaseOverlay.Provider>
        );
    },
);

export const MenuProvider = withDecorator<
    Overlay.Menu.Types.Provider.Props
>(({
    children,
    ...rest
}) => {
    const popover = ContextSelectable.useSelector(Overlay.Popover.Context);

    return (
        <MenuContext.Provider value={{
            ...popover,
            ...rest,
        }}>
            {children}
        </MenuContext.Provider>
    );
});