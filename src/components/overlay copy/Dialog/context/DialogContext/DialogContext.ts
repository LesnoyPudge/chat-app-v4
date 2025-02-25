import { ContextSelectable } from '@lesnoypudge/utils-react';
import { DialogProvider } from '../../components';
import { Popover } from '@components';



export type DialogContext = (
    Popover.Context
    & Required<DialogProvider.OwnProps>
);

export const DialogContext = ContextSelectable.createContext<DialogContext>();