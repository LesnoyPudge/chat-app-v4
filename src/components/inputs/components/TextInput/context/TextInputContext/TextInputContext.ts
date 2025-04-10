import { ContextSelectable } from '@lesnoypudge/utils-react';
import { TextInputTypes } from '../../types';



export const TextInputContext = ContextSelectable.createContext<
    TextInputTypes.Context
>();