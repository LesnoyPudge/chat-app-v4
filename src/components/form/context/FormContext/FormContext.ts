import { ContextSelectable } from '@lesnoypudge/utils-react';
import { FormTypes } from '../../types';



export const FormContext = ContextSelectable.createContext<
    FormTypes.FormContext
>();