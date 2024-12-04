import {
    PopoverConsumerProxy,
    PopoverProvider,
    PopoverWrapper,
} from './components';
import { PopoverContext } from './context';



// https://css-tricks.com/clarifying-the-relationship-between-popovers-and-dialogs
export namespace Popover {
    export const Context = PopoverContext;

    export type Context = PopoverContext;

    export const Consumer = PopoverConsumerProxy;

    export import Provider = PopoverProvider;

    export import Wrapper = PopoverWrapper;
}