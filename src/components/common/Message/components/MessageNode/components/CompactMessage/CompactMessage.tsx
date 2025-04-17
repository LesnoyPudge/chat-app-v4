import { cn, createStyles } from '@/utils';
import { useMessageContext } from '../../../../hooks';
import { FC } from 'react';
import { MessageAdditions, MessageContent, MessageCreatedTimestamp, MessageUsername } from '..';
import { WHITESPACE } from '@/vars';
import { formatSimpleTimestamp } from '../../utils';



const styles = createStyles({
    wrapper: 'flex items-baseline pl-4',
    content: 'w-full',
    heading: 'sr-only',
    time: {
        base: 'mr-2 inline-block text-xs font-medium text-color-muted',
        headless: 'opacity-0 group-hover:opacity-100',
    },
    usernameWrapper: 'font-medium text-color-primary',
    username: 'inline',
});

export const CompactMessage: FC = () => {
    const { isGroupHead, message } = useMessageContext();

    return (
        <div className={styles.wrapper}>
            <div>
                <MessageCreatedTimestamp className={cn(
                    styles.time.base,
                    !isGroupHead && styles.time.headless,
                )}>
                    {formatSimpleTimestamp(message.createdAt)}
                </MessageCreatedTimestamp>
            </div>

            <div className={styles.content}>
                <div>
                    <div className={styles.usernameWrapper}>
                        <MessageUsername className={styles.username}/>

                        {`:${WHITESPACE}`}
                    </div>

                    <MessageContent/>
                </div>

                <MessageAdditions/>
            </div>
        </div>
    );
};