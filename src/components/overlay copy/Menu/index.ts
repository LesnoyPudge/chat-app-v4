import * as c1 from './components';
import * as c2 from './context';
import * as c3 from './hooks';



export namespace Menu {
    export import Wrapper = c1.ContextMenuWrapper;

    export import Provider = c1.ContextMenuProvider;

    export import Context = c2.ContextMenuContext;

    export const { useContextMenuControls } = c3;
}