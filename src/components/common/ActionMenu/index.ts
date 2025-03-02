import * as c1 from './vars';
import * as c2 from './components';



export namespace ActionMenu {
    export const {
        buttonProps,
        styles,
    } = c1;

    export import Wrapper = c2.ActionMenuWrapper;

    export import Group = c2.ActionMenuGroup;
}