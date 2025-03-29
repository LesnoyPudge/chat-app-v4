import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Types } from '../../types';



export const LazyModulesContext = ContextSelectable.createContext<
    Types.Context
>();