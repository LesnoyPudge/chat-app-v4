import { ContextSelectable } from '@lesnoypudge/utils-react';
import { FormTypes } from '../../types';



export const FieldContext = ContextSelectable.createContext<
    FormTypes.FieldContext
>();