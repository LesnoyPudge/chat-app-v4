import { createContextSelectable } from '@lesnoypudge/utils-react';
import { DialogProvider } from '../../components';
import { Popover } from '@components';



export type DialogContext = (
    Popover.Context
    & Required<DialogProvider.OwnProps>
    & {
        id: string;
        describedBy: string;
    }
);

export const DialogContext = createContextSelectable<DialogContext>();