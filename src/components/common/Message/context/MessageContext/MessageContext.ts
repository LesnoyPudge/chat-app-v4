import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Types } from '../../types';



export const MessageContext = ContextSelectable.createContext<
    Types.Context
>();