import { createStyles } from '@/utils';
import { FC } from 'react';
import { useMessageContext, useMessageRedactorContext } from '../../../../hooks';
import { RTE } from '@/components';
import { MessageModifiedTimestamp } from '..';
import { useTrans } from '@/hooks';
import { WHITESPACE } from '@/vars';



const styles = createStyles({
    wrapper: `
        inline 
        leading-[--message-line-height]
        [font-size:var(--message-font-size)]
    `,
});

export const MessageContent: FC = () => {
    const { t } = useTrans();
    const { contentId, message } = useMessageContext();
    const { getIsRedactorActive } = useMessageRedactorContext();

    return (
        <div
            className={styles.wrapper}
            id={contentId}
        >
            <If condition={!getIsRedactorActive(message.id)}>
                <RTE.Serialized value={message.content}/>

                <MessageModifiedTimestamp>
                    {WHITESPACE}
                    {t('Message.Content.modifiedMark')}
                </MessageModifiedTimestamp>
            </If>
        </div>
    );
};