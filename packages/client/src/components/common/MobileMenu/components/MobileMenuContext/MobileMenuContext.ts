import { createContextSelectable } from '@lesnoypudge/utils-react';



export type MobileMenuContext = {
    isMobile: boolean;
    isMenuOpen: boolean;
    shouldShowMenu: boolean;
    shouldShowContent: boolean;
    openMenu: VoidFunction;
    closeMenu: VoidFunction;
    toggleMenu: VoidFunction;
};

export const MobileMenuContext = createContextSelectable<
    MobileMenuContext
>();