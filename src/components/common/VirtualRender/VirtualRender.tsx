import * as components from './components';
import * as hooks from './hooks';
import * as types from './types';



export namespace VirtualRender {
    export import Types = types.Types;

    export const {
        VirtualRenderList: List,
    } = components;

    export const { useVirtualArray } = hooks;
}