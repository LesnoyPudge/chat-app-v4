import { T } from '@lesnoypudge/types-utils-base/namespace';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { BaseOverlay } from '../../../BaseOverlay';



export type PopoverContext = T.Simplify<
    BaseOverlay.Context
    & {
        blockingChildren: Set<string>;
        focused: boolean;
        handleClickOutside: VoidFunction;
        handleEscape: VoidFunction;
    }
>;

export const PopoverContext = ContextSelectable.createContext<PopoverContext>();