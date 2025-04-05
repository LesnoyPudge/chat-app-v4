import { ChatPageTemplate } from '@/router/templates';
import { FC } from 'react';
import { Header } from './components';



export const ConversationPanel: FC = () => {
    return (
        <ChatPageTemplate.Node
            header={<Header/>}
            main={(
                <>
                    <div>feed</div>
                    <div>message input</div>
                </>
            )}
            extra={null}
        />
    );
};