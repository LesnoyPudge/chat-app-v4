import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Overlay } from 'src/components/overlay_3';



export const PopoverContext = ContextSelectable.createContext<
    Overlay.Popover.Types.Context
>();