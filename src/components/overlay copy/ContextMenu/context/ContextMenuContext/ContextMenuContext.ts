import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Popover } from '@components';



export type ContextMenuContext = Popover.Context;

export const ContextMenuContext = ContextSelectable.createContext<ContextMenuContext>();