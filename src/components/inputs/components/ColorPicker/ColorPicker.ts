import * as components from './components';
import * as context from './context';
import * as types from './types';



export namespace ColorPicker {
    export import Types = types.ColorPickerTypes;

    export const {
        ColorPickerNode: Node,
        ColorPickerProvider: Provider,
    } = components;

    export const {
        ColorPickerContext: Context,
        useColorPickerContextProxy: useProxy,
        useColorPickerContextSelector: useSelector,
    } = context;
}