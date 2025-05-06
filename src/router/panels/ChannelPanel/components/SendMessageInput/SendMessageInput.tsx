import { MessageEditor, With } from '@/components';
import { Navigator, Store } from '@/features';
import { createStyles } from '@/utils';



const styles = createStyles({
    wrapper: 'shrink-0',
});

export const SendMessageInput = () => {
    const { channelId } = Navigator.useParams('channel');

    const textChatId = Store.useSelector(
        Store.Channels.Selectors.selectTextChatById(channelId),
    );

    const shouldShowInput = !!textChatId;
    const shouldShowPlaceholder = !textChatId;

    return (
        <div className={styles.wrapper}>
            <If condition={shouldShowInput}>
                <With value={textChatId}>
                    {(textChatId) => (
                        <MessageEditor.Presets.SendMessageInput
                            textChatId={textChatId}
                        />
                    )}
                </With>
            </If>

            <If condition={shouldShowPlaceholder}>
                <MessageEditor.Presets.Placeholder/>
            </If>
        </div>
    );
};