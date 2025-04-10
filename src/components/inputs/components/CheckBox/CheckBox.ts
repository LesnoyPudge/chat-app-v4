import * as components from './components';
import * as context from './context';
import * as hooks from './hooks';
import * as types from './types';



export namespace CheckBox {
    export import Types = types.CheckBoxTypes;

    export const {
        CheckBoxNode: Node,
        CheckBoxProvider: Provider,
        CheckBoxIndicatorCheck: Check,
        CheckBoxIndicatorSlide: Slide,
    } = components;

    export const {
        CheckBoxContext: Context,
    } = context;

    export const {
        useCheckBoxContext: useContext,
    } = hooks;
}