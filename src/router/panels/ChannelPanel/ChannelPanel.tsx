import { ChatPageTemplate } from '@/router/templates';
import { FC, Fragment } from 'react';
import {
    Header,
    MemberList,
    SendMessageInput,
    ChannelFeed,
} from './components';
import { Navigator } from '@/features';



export const ChannelPanel: FC = () => {
    const { channelId } = Navigator.useParams('channel');

    return (
        <ChatPageTemplate.Node
            header={<Header key={channelId}/>}
            main={(
                <Fragment key={channelId}>
                    <ChannelFeed/>

                    <SendMessageInput/>
                </Fragment>
            )}
            extra={<MemberList/>}
        />
    );
};