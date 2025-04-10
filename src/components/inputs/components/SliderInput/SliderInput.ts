import * as components from './components';
import * as context from './context';
import * as hooks from './hooks';
import * as types from './types';



export namespace SliderInput {
    export import Types = types.SliderInputTypes;

    export const {
        SliderInputNode: Node,
        SliderInputProvider: Provider,
    } = components;

    export const {
        SliderInputContext: Context,
    } = context;

    export const {
        useSliderInputContext: useContext,
    } = hooks;
}