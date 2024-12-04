import { createContextSelectable } from '@lesnoypudge/utils-react';
import { DialogProvider } from '../../components';



export type DialogContext = (
    Required<DialogProvider.OwnProps>
    & {
        id: string;
        describedBy: string;
    }
);

export const DialogContext = createContextSelectable<DialogContext>();