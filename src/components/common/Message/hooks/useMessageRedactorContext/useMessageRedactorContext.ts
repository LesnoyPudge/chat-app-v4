import { ContextSelectable } from '@lesnoypudge/utils-react';
import { MessageRedactorContext } from '../../context';



export const useMessageRedactorContext = () => {
    return ContextSelectable.useProxy(MessageRedactorContext);
};