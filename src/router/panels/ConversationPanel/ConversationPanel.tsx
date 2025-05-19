import { ChatPageTemplate } from '@/router/templates';
import { FC, Fragment } from 'react';
import { Header, ConversationFeed, SendMessageInput } from './components';
import { Navigator } from '@/features';



export const ConversationPanel: FC = () => {
    const { conversationId } = Navigator.useParams('conversation');

    return (
        <ChatPageTemplate.Node
            header={<Header key={conversationId}/>}
            main={(
                <Fragment key={conversationId}>
                    <ConversationFeed/>

                    <SendMessageInput/>
                </Fragment>
            )}
            extra={null}
        />
    );
};