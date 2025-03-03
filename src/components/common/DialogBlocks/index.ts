import * as c1 from './entities';
import * as c2 from './types';
// import { Overlay } from '../../overlay';
import { Overlay } from '@/components';



export namespace DialogBlocks {
    export import Context = Overlay.Dialog.Context;

    export import Provider = Overlay.Dialog.Provider;

    export import Base = c1.BaseDialogBlocks;

    // export import FullScreen = c1.FullScreenDialogBlocks;

    export import Types = c2.Types;
}