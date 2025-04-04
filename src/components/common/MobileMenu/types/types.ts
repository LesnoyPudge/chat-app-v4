import { T } from '@lesnoypudge/types-utils-base/namespace';
import { LayoutType } from '@/components';



export namespace Types {
    export type Context = T.Simplify<(
        LayoutType.Types.Context
        & {
            isMenuOpen: boolean;
            shouldShowMenu: boolean;
            shouldShowContent: boolean;
            shouldFocusMenu: boolean;
            shouldFocusContent: boolean;
            openMenu: VoidFunction;
            closeMenu: VoidFunction;
            toggleMenu: VoidFunction;
        }
    )>;
}