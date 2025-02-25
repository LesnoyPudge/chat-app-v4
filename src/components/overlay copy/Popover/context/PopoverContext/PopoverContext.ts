import { T } from '@lesnoypudge/types-utils-base/namespace';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Overlay } from '@components';



export type PopoverContext = T.Simplify<
    Overlay.Context
    & {
        blockingChildren: Set<string>;
        focused: boolean;
        handleClickOutside: VoidFunction;
        handleEscape: VoidFunction;
    }
>;

export const PopoverContext = ContextSelectable.createContext<PopoverContext>();