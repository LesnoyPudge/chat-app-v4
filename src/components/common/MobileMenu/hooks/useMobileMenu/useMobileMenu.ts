import { ContextSelectable } from '@lesnoypudge/utils-react';
import { MobileMenuContext } from '../../context';



export const useMobileMenu = () => {
    return ContextSelectable.useProxy(MobileMenuContext);
};