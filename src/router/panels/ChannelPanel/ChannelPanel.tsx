import { ChatPageTemplate } from '@/router/templates';
import { FC } from 'react';
import {
    Header,
    MemberList,
    SendMessageInput,
    ChannelFeed,
} from './components';



export const ChannelPanel: FC = () => {
    return (
        <ChatPageTemplate.Node
            header={<Header/>}
            main={(
                <>
                    <ChannelFeed/>

                    <SendMessageInput/>
                </>
            )}
            extra={<MemberList/>}
        />
    );
};