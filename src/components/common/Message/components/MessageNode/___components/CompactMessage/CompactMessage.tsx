import { cn } from '@utils';
import { FC, useContext } from 'react';
import { MessageAdditions, MessageContent, MessageTimestamp, MessageUsername } from '..';
import { MessageContext } from '../../Message';



const styles = {
    wrapper: 'flex items-baseline pl-4',
    content: 'w-full',
    heading: 'sr-only',
    time: {
        base: 'inline-block text-xs text-color-muted font-medium mr-2',
        headless: 'opacity-0 group-hover:opacity-100',
    },
    usernameWrapper: 'text-color-primary font-medium',
    username: 'inline underline-offset-4 focus-visible:underline hover:underline',   
};

export const CompactMessage: FC = () => {
    const { isGroupHead } = useContext(MessageContext);

    return (
        <div className={styles.wrapper}>
            <div>
                <MessageTimestamp className={cn(
                    styles.time.base,
                    { [styles.time.headless]: !isGroupHead },
                )}/>
            </div>
            
            <div className={styles.content}>
                <div>
                    <span className={styles.usernameWrapper}>
                        <MessageUsername className={styles.username}/>

                        <>: </>
                    </span>

                    <MessageContent/>
                </div>

                <MessageAdditions/>
            </div>
        </div>
    );
};