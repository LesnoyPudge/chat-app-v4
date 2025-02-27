import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Overlay } from '@components';



export const DialogContext = ContextSelectable.createContext<
    Overlay.Dialog.Types.Context
>();