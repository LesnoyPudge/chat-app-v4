import { ChatPageTemplate } from '@/router/templates';
import { FC } from 'react';
import { Header, MemberList } from './components';



export const ChannelPanel: FC = () => {
    return (
        <ChatPageTemplate.Node
            header={<Header/>}
            main={(
                <>
                    <div>feed</div>
                    <div>message input</div>
                </>
            )}
            extra={<MemberList/>}
        />
    );
};