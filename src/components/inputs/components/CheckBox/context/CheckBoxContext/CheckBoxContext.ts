import { ContextSelectable } from '@lesnoypudge/utils-react';
import { CheckBoxTypes } from '../../types';



export const CheckBoxContext = ContextSelectable.createContext<
    CheckBoxTypes.Context
>();