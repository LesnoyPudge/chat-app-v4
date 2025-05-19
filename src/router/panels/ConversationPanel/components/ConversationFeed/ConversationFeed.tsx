import { Feed } from '@/components';
import { Navigator, Store } from '@/features';



export const ConversationFeed = () => {
    const { conversationId } = Navigator.useParams('conversation');

    const textChatId = Store.useSelector(
        Store.Conversations.Selectors.selectTextChatById(conversationId),
    );

    return (
        <Feed textChatId={textChatId}/>
    );
};