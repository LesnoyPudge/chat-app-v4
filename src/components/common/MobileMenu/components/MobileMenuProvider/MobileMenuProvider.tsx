import { FC, PropsWithChildren } from 'react';
import { Types } from '../../types';
import { useBoolean } from '@lesnoypudge/utils-react';
import { MobileMenuContext } from '../../context';
import { LayoutType } from '@/components';



export const MobileMenuProvider: FC<PropsWithChildren> = ({
    children,
}) => {
    const { isDesktop, isMobile } = LayoutType.useLayoutType();
    const menuState = useBoolean(isMobile);

    const isMenuActive = menuState.value;
    const isContentActive = !isMenuActive;

    const contextValue: Types.Context = {
        isMobile,
        isDesktop,
        isMenuOpen: menuState.value,
        closeMenu: menuState.setFalse,
        openMenu: menuState.setTrue,
        toggleMenu: menuState.toggle,
        shouldShowMenu: isDesktop || isMenuActive,
        shouldFocusMenu: isMobile && isMenuActive,
        shouldShowContent: isDesktop || isContentActive,
        shouldFocusContent: isMobile && isContentActive,
    };

    return (
        <MobileMenuContext.Provider value={contextValue}>
            {children}
        </MobileMenuContext.Provider>
    );
};