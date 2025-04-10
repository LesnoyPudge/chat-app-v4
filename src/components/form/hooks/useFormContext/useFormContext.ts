import { ContextSelectable } from '@lesnoypudge/utils-react';
import { FormContext } from '../../context';



export const useFormContext = () => {
    return ContextSelectable.useProxy(FormContext);
};