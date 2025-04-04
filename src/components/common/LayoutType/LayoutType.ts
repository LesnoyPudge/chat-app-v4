import * as context from './context';
import * as types from './types';
import * as hooks from './hooks';
import * as components from './components';



export namespace LayoutType {
    export import Types = types.Types;

    export const {
        LayoutTypeContext: Context,
    } = context;

    export const {
        LayoutTypeProvider: Provider,
    } = components;

    export const {
        useLayoutType,
    } = hooks;
}