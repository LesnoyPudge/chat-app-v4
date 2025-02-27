import * as c1 from './components';
import * as c2 from './context';
import * as c3 from './types';



export namespace Popover {
    export import Context = c2.PopoverContext;

    export import Provider = c1.PopoverProvider;

    export import Wrapper = c1.PopoverWrapper;

    export import Types = c3.Types;
}