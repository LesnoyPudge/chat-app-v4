import * as components from './components';
import * as context from './context';
import * as hooks from './hooks';
import * as types from './types';


export namespace LazyModules {
    export import Types = types.Types;

    export const Context = context.LazyModulesContext;

    export const Provider = components.LazyModulesProvider;

    export const {
        useLazyModulesContext: useContext,
    } = hooks;
}