import { cn, createStyles } from '@/utils';
import { PropsWithClassName } from '@lesnoypudge/types-utils-react';
import { FC } from 'react';
import { MessageAttachmentFiles, MessageAttachmentImages } from './components';
import { useMessageContext } from '../../../../hooks';



const styles = createStyles({
    wrapper: 'flex max-w-[550px] flex-col gap-2',
});

export const MessageAttachments: FC<PropsWithClassName> = ({
    className = '',
}) => {
    const { message } = useMessageContext();

    if (!message.attachments.length) return null;

    return (
        <div className={cn(styles.wrapper, className)}>
            <MessageAttachmentImages/>

            <MessageAttachmentFiles/>
        </div>
    );
};