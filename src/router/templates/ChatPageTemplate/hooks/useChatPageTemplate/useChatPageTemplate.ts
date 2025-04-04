import { ContextSelectable } from '@lesnoypudge/utils-react';
import { ChatPageTemplateContext } from '../../context';



export const useChatPageTemplate = () => {
    return ContextSelectable.useProxy(ChatPageTemplateContext);
};