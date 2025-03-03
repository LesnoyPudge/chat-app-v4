import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Overlay } from '@/components';



export const MenuContext = ContextSelectable.createContext<
    Overlay.Menu.Types.Context
>();