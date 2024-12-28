import * as c1 from './components';
import * as c2 from './context';



export namespace Popover {
    export import Context = c2.PopoverContext;

    export import Consumer = c1.PopoverConsumerProxy;

    export import Provider = c1.PopoverProvider;

    export import Wrapper = c1.PopoverWrapper;
}