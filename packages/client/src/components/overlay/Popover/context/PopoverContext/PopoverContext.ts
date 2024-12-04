import { createContextSelectable } from '@lesnoypudge/utils-react';



export type PopoverContext = {
    blockingChildren: Set<string>;
    focused: boolean;
    handleClickOutside: VoidFunction;
    handleEscape: () => void;
};

export const PopoverContext = createContextSelectable<PopoverContext>();