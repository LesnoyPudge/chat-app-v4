import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Types } from '../../types/types';



export const NavigatorContext = ContextSelectable.createContext<
    Types.Context
>();