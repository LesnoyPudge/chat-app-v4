import { ContextSelectable } from '@lesnoypudge/utils-react';
import { RadioInputContext } from '../../context';



export const useRadioInputContext = () => {
    return ContextSelectable.useProxy(RadioInputContext);
};