import { ContextSelectable } from '@lesnoypudge/utils-react';
import { DialogContext } from '../../context';



export const useDialogContext = () => {
    return ContextSelectable.useProxy(DialogContext);
};