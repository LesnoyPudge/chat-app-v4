import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Overlay } from '@/components';
import { MenuContext } from '../../context';
import { FC } from 'react';



export const MenuProvider: FC<Overlay.Menu.Types.Provider.Props> = ({
    controls,
    children,
    ...rest
}) => {
    return (
        <Overlay.BaseOverlay.Provider controls={controls}>
            <Overlay.Popover.Provider
                blockable
                blocking
                closeOnClickOutside
                closeOnEscape
                focused
            >
                <ContextSelectable.ConsumerSelector
                    context={Overlay.Popover.Context}
                    selector={(v) => v}
                >
                    {(popover) => (
                        <MenuContext.Provider value={{
                            controls,
                            ...popover,
                            ...rest,
                        }}>
                            {children}
                        </MenuContext.Provider>
                    )}
                </ContextSelectable.ConsumerSelector>
            </Overlay.Popover.Provider>
        </Overlay.BaseOverlay.Provider>
    );
};