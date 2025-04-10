import { ContextSelectable } from '@lesnoypudge/utils-react';
import { TextAreaTypes } from '../../types';



export const TextAreaContext = ContextSelectable.createContext<
    TextAreaTypes.Context
>();