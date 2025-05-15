import { Feed } from '@/components';
import { Navigator, Store } from '@/features';



export const ChannelFeed = () => {
    const { channelId } = Navigator.useParams('channel');

    const textChatId = Store.useSelector(
        Store.Channels.Selectors.selectTextChatById(channelId),
    );

    return (
        <Feed
            key={textChatId}
            textChatId={textChatId}
        />
    );
};