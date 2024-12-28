import { createContextSelectable } from '@lesnoypudge/utils-react';
import { Popover } from '@components';



export type ContextMenuContext = Popover.Context;

export const ContextMenuContext = createContextSelectable<ContextMenuContext>();