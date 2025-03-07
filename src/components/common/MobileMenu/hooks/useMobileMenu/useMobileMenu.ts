import { ContextSelectable } from '@lesnoypudge/utils-react';
import { MobileMenuContext } from '../../components';



export const useMobileMenu = () => {
    return ContextSelectable.useProxy(MobileMenuContext);
};