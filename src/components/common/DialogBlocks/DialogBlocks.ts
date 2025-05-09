import * as variants from './blockVariants';
import * as types from './types';
import * as hooks from './hooks';



export namespace DialogBlocks {
    export const {
        useDialogBlocksContextProxy: useContextProxy,
        useDialogBlocksContextSelector: useContextSelector,
    } = hooks;

    export import Base = variants.BaseDialogBlocks;

    export import FullScreen = variants.FullScreenDialogBlocks;

    export import Types = types.Types;
}