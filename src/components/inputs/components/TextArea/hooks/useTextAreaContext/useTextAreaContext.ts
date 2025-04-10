import { ContextSelectable } from '@lesnoypudge/utils-react';
import { TextAreaContext } from '../../context';



export const useTextAreaContext = () => {
    return ContextSelectable.useProxy(TextAreaContext);
};