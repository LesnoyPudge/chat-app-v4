import * as components from './components';
import * as context from './context';
import * as types from './types';
import * as hooks from './hooks';


export namespace LazyModules {
    export import Types = types.Types;

    export const {
        useLazyModulesContextProxy: useContext,
    } = context;

    export const {
        useIsLazyModuleLoaded: useIsModuleLoaded,
    } = hooks;

    export const {
        LazyModulesProvider: Provider,
    } = components;
}