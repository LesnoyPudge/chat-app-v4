import {
    PopoverConsumerProxy,
    PopoverProvider,
    PopoverWrapper,
} from './components';
import { PopoverContext } from './context';



export namespace Popover {
    export const Context = PopoverContext;

    export type Context = PopoverContext;

    export const Consumer = PopoverConsumerProxy;

    export import Provider = PopoverProvider;

    export import Wrapper = PopoverWrapper;
}