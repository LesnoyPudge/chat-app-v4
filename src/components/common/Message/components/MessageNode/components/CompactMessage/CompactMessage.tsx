import { cn, createStyles } from '@/utils';
import { useIsMessageRedactorActive, useMessageContext } from '../../../../hooks';
import { FC } from 'react';
import { MessageAdditions, MessageContent, MessageCreatedTimestamp, MessageUsername } from '..';
import { WHITESPACE } from '@/vars';
import { formatSimpleTimestamp } from '../../utils';



const styles = createStyles({
    wrapper: 'flex',
    firstCol: 'flex w-[48px] shrink-0 items-start justify-center',
    timestamp: {
        base: 'leading-[--message-line-height]',
        headless: `
            opacity-0 
            group-hover-focus-within/message:opacity-100
        `,
    },
    secondCol: 'w-full',
    username: 'inline',
    content: 'inline',
});

export const CompactMessage: FC = () => {
    const { isGroupHead, message } = useMessageContext();
    const isRedactorActive = useIsMessageRedactorActive(message.id);

    return (
        <div className={styles.wrapper}>
            <div className={styles.firstCol}>
                <MessageCreatedTimestamp className={cn(
                    styles.timestamp.base,
                    !isGroupHead && styles.timestamp.headless,
                )}>
                    {formatSimpleTimestamp(message.createdAt)}
                </MessageCreatedTimestamp>
            </div>

            <If condition={!isRedactorActive}>
                <div className={styles.secondCol}>
                    <MessageUsername
                        className={styles.username}
                        postfix={`:${WHITESPACE}`}
                    />

                    <MessageContent className={styles.content}/>
                </div>
            </If>

            <MessageAdditions/>
        </div>
    );
};