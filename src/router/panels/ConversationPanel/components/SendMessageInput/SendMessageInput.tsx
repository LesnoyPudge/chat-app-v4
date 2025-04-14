import { MessageEditor, With } from '@/components';
import { Navigator, Store } from '@/features';



export const SendMessageInput = () => {
    const { conversationId } = Navigator.useParams('conversation');

    const conversation = Store.useSelector(
        Store.Conversations.Selectors.selectById(conversationId),
    );
    const shouldShowInput = !!conversation;
    const shouldShowPlaceholder = !conversation;

    return (
        <>
            <If condition={shouldShowInput}>
                <With value={conversation}>
                    {({ textChat }) => (
                        <MessageEditor.Presets.SendMessageInput
                            textChatId={textChat}
                        />
                    )}
                </With>
            </If>

            <If condition={shouldShowPlaceholder}>
                <MessageEditor.Presets.Placeholder/>
            </If>
        </>
    );
};