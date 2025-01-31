import * as c1 from './components';
import * as c2 from './context';
import * as c3 from './vars';



export namespace ContextMenu {
    export import Wrapper = c1.ContextMenuWrapper;

    export import Container = c1.ContextMenuContainer;

    export import Context = c2.ContextMenuContext;

    export const {
        menuItemStyles,
        menuItemProps,
    } = c3;
}