import { createContextSelectable } from '@lesnoypudge/utils-react';



export type PopoverContext = {
    blockingChildren: Set<string>;
    focused: boolean;
    handleClickOutside: VoidFunction;
    handleEscape: VoidFunction;
};

export const PopoverContext = createContextSelectable<PopoverContext>();