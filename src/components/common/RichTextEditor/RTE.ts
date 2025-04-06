import * as components from './components';
import * as types from './types';
import * as modules from './RTEModules';
import * as context from './context';



export namespace RTE {
    export import Types = types.RTETypes;

    export import Modules = modules.RTEModules;

    export const {
        RTEContentEditable: Editable,
        RTEContextProvider: Provider,
        RTESerialized: Serialized,
    } = components;

    export const {
        RTEContext: Context,
    } = context;
};