import * as c1 from './components';
import * as c2 from './context';
import * as c3 from './hooks';



export namespace Menu {
    export import Wrapper = c1.MenuWrapper;

    export import Provider = c1.MenuProvider;

    export import MenuContext = c2.MenuContext;

    export const { useContextMenuControls } = c3;
}