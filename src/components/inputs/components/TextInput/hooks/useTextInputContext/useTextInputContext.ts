import { ContextSelectable } from '@lesnoypudge/utils-react';
import { TextInputContext } from '../../context';



export const useTextInputContext = () => {
    return ContextSelectable.useProxy(TextInputContext);
};