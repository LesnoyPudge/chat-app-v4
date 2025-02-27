import { Overlay } from '@components';
import { ContextSelectable } from '@lesnoypudge/utils-react';



export const BaseModalContext = ContextSelectable.createContext<
    Overlay.Modal.Base.Types.Context
>();