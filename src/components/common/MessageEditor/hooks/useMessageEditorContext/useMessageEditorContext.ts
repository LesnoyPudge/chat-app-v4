import { ContextSelectable } from '@lesnoypudge/utils-react';
import { MessageEditorContext } from '../../context';



export const useMessageEditorContext = () => {
    return ContextSelectable.useProxy(MessageEditorContext);
};