import * as c1 from './components';
import * as c2 from './hooks';



export namespace MobileMenu {
    export import Context = c1.MobileMenuContext;

    export import Provider = c1.MobileMenuProvider;

    export const { useMobileMenu } = c2;
}