import { Feed } from '@/components';
import { Navigator, Store } from '@/features';
import { invariant } from '@lesnoypudge/utils';



export const ConversationFeed = () => {
    const { conversationId } = Navigator.useParams('conversation');

    const textChatId = Store.useSelector(
        Store.Conversations.Selectors.selectTextChatById(conversationId),
    );
    invariant(textChatId);

    return (
        <Feed
            key={textChatId}
            textChatId={textChatId}
        />
    );
};