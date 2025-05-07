import { MessageEditor } from '@/components';
import { Navigator, Store } from '@/features';
import { createStyles } from '@/utils';
import { If } from '@lesnoypudge/react-if';



const styles = createStyles({
    wrapper: 'shrink-0',
});

export const SendMessageInput = () => {
    const { conversationId } = Navigator.useParams('conversation');

    const textChatId = Store.useSelector(
        Store.Conversations.Selectors.selectTextChatById(conversationId),
    );

    const shouldShowPlaceholder = !textChatId;

    return (
        <div className={styles.wrapper}>
            <If condition={textChatId}>
                {(textChatId) => (
                    <MessageEditor.Presets.SendMessageInput
                        textChatId={textChatId}
                    />
                )}
            </If>

            <If condition={shouldShowPlaceholder}>
                <MessageEditor.Presets.Placeholder/>
            </If>
        </div>
    );
};