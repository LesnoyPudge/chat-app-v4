import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Types } from '../../types';



export const LayoutTypeContext = ContextSelectable.createContext<
    Types.Context
>();