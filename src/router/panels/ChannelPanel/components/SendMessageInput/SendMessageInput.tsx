import { MessageEditor, With } from '@/components';
import { Navigator, Store } from '@/features';



export const SendMessageInput = () => {
    const { channelId } = Navigator.useParams('channel');

    const channel = Store.useSelector(
        Store.Channels.Selectors.selectById(channelId),
    );

    const shouldShowInput = !!channel;
    const shouldShowPlaceholder = !channel;

    return (
        <>
            <If condition={shouldShowInput}>
                <With value={channel?.textChat}>
                    {(textChat) => (
                        <MessageEditor.Presets.SendMessageInput
                            textChatId={textChat}
                        />
                    )}
                </With>
            </If>

            <If condition={shouldShowPlaceholder}>
                <MessageEditor.Presets.Placeholder/>
            </If>
        </>
    );
};