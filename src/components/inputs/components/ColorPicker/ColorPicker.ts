import * as components from './components';
import * as context from './context';
import * as hooks from './hooks';
import * as types from './types';



export namespace ColorPicker {
    export import Types = types.ColorPickerTypes;

    export const {
        ColorPickerNode: Node,
        ColorPickerProvider: Provider,
    } = components;

    export const {
        ColorPickerContext: Context,
    } = context;

    export const {
        useColorPickerContext: useContext,
    } = hooks;
}