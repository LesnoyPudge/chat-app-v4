import { ContextSelectable } from '@lesnoypudge/utils-react';
import { RadioInputTypes } from '../../types';



export const RadioInputContext = ContextSelectable.createContext<
    RadioInputTypes.Context
>();