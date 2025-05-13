import * as types from './types';
import * as hooks from './hooks';



export namespace AnimationPresets {
    export import Types = types.Types;

    export const {
        usePresetCustom: useCustom,
        usePresetBaseDialog: useBaseDialog,
        usePresetBaseDialogBackdrop: useBaseDialogBackdrop,
        usePresetFade: useFade,
        usePresetFullScreenDialog: useFullScreenDialog,
        usePresetPopoverMenu: usePopoverMenu,
    } = hooks;
}