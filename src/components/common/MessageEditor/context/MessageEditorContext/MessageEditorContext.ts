import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Types } from '../../types';



export const MessageEditorContext = ContextSelectable.createContext<
    Types.Context
>();