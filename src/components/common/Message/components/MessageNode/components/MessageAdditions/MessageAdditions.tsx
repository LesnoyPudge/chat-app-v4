import { FC } from 'react';
import { createStyles } from '@/utils';
import { MessageAttachments } from '../MessageAttachments';
import { MessageReactions } from '../MessageReactions';
import { MessageRedactor } from '../MessageRedactor';



const styles = createStyles({
    gap: 'my-1.5',
});

export const MessageAdditions: FC = () => {
    return (
        <>
            <MessageRedactor className={styles.gap}/>

            <MessageAttachments className={styles.gap}/>

            <MessageReactions className={styles.gap}/>
        </>
    );
};