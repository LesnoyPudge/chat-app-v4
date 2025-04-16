import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Types } from '../../types';



export const MessageRedactorContext = ContextSelectable.createContext<
    Types.RedactorContext
>();