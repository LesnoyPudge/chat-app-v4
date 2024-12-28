import * as c1 from './components';
import * as c2 from './context';
import * as c3 from './vars';



export namespace ContextMenu {
    export import Node = c1.ContextMenuNode;

    export import Container = c1.ContextMenuContainer;

    export import Context = c2.ContextMenuContext;

    export const {
        menuItemStyles,
        menuItemProps,
    } = c3;
}