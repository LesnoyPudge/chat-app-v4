import { ChatPageTemplate } from '@/router/templates';
import { FC } from 'react';
import { Header, ConversationFeed, SendMessageInput } from './components';



export const ConversationPanel: FC = () => {
    return (
        <ChatPageTemplate.Node
            header={<Header/>}
            main={(
                <>
                    <ConversationFeed/>

                    <SendMessageInput/>
                </>
            )}
            extra={null}
        />
    );
};