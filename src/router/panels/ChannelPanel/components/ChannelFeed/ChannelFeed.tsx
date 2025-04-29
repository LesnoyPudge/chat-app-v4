import { Feed } from '@/components';
import { Navigator, Store } from '@/features';
import { invariant } from '@lesnoypudge/utils';



export const ChannelFeed = () => {
    const { channelId } = Navigator.useParams('channel');

    const textChatId = Store.useSelector(
        Store.Channels.Selectors.selectTextChatById(channelId),
    );
    invariant(textChatId);

    return (
        <Feed
            key={textChatId}
            textChatId={textChatId}
        />
    );
};