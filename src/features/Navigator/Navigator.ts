import * as hooks from './hooks';
import * as vars from './vars';
import * as components from './components';
import * as context from './context';
import * as types from './types';



export namespace Navigator {
    export import Types = types.Types;

    export const {
        useIsLocation,
        useNavigateTo,
        useParams,
        useTryNavigateToChannel,
        useTryNavigateToConversation,
    } = hooks;

    export const {
        navigatorPath,
        staticNavigatorPath,
        params,
        navigatorDevPath,
        pathToParams,
    } = vars;

    export import Context = context.NavigatorContext;

    export import ParamsContext = context.ParamsContext;

    export import Provider = components.NavigatorContextProvider;

    export import ParamsProvider = components.ParamsContextProvider;
}