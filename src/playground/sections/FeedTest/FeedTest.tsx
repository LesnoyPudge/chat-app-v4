import { Feed } from '@/components';
import { Store } from '@/features';
import { invariant } from '@lesnoypudge/utils';
import { FC } from 'react';



export const FeedTest: FC = () => {
    const [textChat] = Store.useSelector(
        Store.TextChats.Selectors.selectAll,
    );

    invariant(textChat, 'Text chats not loaded');

    return (
        <Feed textChatId={textChat.id}/>
    );
};