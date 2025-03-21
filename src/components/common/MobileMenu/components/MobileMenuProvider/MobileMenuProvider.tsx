import { FC, PropsWithChildren } from 'react';
import { MobileMenuContext } from '../MobileMenuContext';
import { useBoolean } from '@lesnoypudge/utils-react';
import { Store } from '@/features';



export const MobileMenuProvider: FC<PropsWithChildren> = ({
    children,
}) => {
    const isMobile = Store.useSelector(
        Store.App.Selectors.selectIsMobileScreen,
    );
    const menuState = useBoolean(isMobile);

    const contextValue: MobileMenuContext = {
        isMobile,
        isDesktop: !isMobile,
        isMenuOpen: menuState.value,
        closeMenu: menuState.setFalse,
        openMenu: menuState.setTrue,
        toggleMenu: menuState.toggle,
        shouldShowMenu: isMobile && menuState.value,
        shouldShowContent: isMobile && !menuState.value,
    };

    return (
        <MobileMenuContext.Provider value={contextValue}>
            {children}
        </MobileMenuContext.Provider>
    );
};