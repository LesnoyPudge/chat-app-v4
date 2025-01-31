import * as c1 from './hooks';
import * as c2 from './vars';



export namespace Navigator {
    export const { useNavigator } = c1;

    export const {
        navigatorPath,
        staticNavigatorPath,
        params,
        navigatorDevPath,
        pathToParams,
    } = c2;
}