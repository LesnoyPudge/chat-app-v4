import { ContextSelectable } from '@lesnoypudge/utils-react';
import { Types } from '../../types';



export const GlobalLoaderContext = ContextSelectable.createContext<
    Types.Context
>();