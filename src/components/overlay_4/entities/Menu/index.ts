import * as c1 from './components';
import * as c2 from './context';
import * as c3 from './hooks';
import * as c4 from './types';



export namespace Menu {
    export import Wrapper = c1.MenuWrapper;

    export import Provider = c1.MenuProvider;

    export import Context = c2.MenuContext;

    export import Types = c4.Types;

    export const { useContextMenuControls } = c3;
}