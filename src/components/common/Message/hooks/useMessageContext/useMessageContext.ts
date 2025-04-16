import { ContextSelectable } from '@lesnoypudge/utils-react';
import { MessageContext } from '../../context';



export const useMessageContext = () => {
    return ContextSelectable.useProxy(MessageContext);
};