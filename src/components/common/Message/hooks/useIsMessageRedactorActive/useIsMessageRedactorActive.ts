import { ContextSelectable } from '@lesnoypudge/utils-react';
import { MessageRedactorContext } from '../../context';



export const useIsMessageRedactorActive = (messageId: string) => {
    return ContextSelectable.useSelector(
        MessageRedactorContext,
        (v) => v.activeMessageId === messageId,
    );
};