import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Types } from '../../types';



export const ChatPageTemplateContext = ContextSelectable.createContext<
    Types.Context
>();