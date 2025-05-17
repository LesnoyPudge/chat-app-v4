import { cn, createStyles } from '@/utils';
import { FC } from 'react';
import {
    useIsMessageRedactorActive,
    useMessageContext,
} from '../../../../hooks';
import { RTE } from '@/components';
import { MessageModifiedTimestamp } from '../MessageModifiedTimestamp';
import { useTrans } from '@/hooks';
import { WHITESPACE } from '@/vars';
import { RT } from '@lesnoypudge/types-utils-react/namespace';



const styles = createStyles({
    wrapper: `
        leading-[--message-line-height]
        [font-size:var(--message-font-size)]
    `,
});

export const MessageContent: FC<RT.PropsWithClassName> = ({
    className = '',
}) => {
    const { t } = useTrans();
    const { contentId, message } = useMessageContext();
    const isRedactorActive = useIsMessageRedactorActive(message.id);

    if (isRedactorActive) return null;

    return (
        <div
            className={cn(styles.wrapper, className)}
            id={contentId}
        >
            <RTE.Serialized value={message.content}/>

            <MessageModifiedTimestamp>
                {WHITESPACE}
                {t('Message.Content.modifiedMark')}
            </MessageModifiedTimestamp>
        </div>
    );
};