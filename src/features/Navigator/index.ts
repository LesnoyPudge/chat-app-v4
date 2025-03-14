import * as c1 from './hooks';
import * as c2 from './vars';
import * as c3 from './components';
import * as c4 from './context';
import * as c5 from './types';



export namespace Navigator {
    export import Types = c5.Types;

    export const { useIsLocation, useNavigateTo } = c1;

    export const {
        navigatorPath,
        staticNavigatorPath,
        params,
        navigatorDevPath,
        pathToParams,
    } = c2;

    export import Context = c4.NavigatorContext;

    export import Provider = c3.NavigatorContextProvider;
}