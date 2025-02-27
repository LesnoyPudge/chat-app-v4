import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Overlay } from '@components';



export const BaseOverlayContext = ContextSelectable.createContext<
    Overlay.BaseOverlay.Types.Context
>();