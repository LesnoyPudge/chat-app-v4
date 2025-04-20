import { createStyles } from '@/utils';
import { MessageAdditions, MessageContent, MessageUsername } from '..';
import { useMessageContext } from '../../../../hooks';
import { FC } from 'react';
import { MessageCreatedTimestamp } from '../../components';
import { Avatar } from '@/components';
import { Store } from '@/features';
import { formatCreationTimestamp, formatSimpleTimestamp } from '../../utils';



const styles = createStyles({
    wrapper: 'flex',
    firstCol: 'flex w-[72px] shrink-0 items-start justify-center',
    avatar: 'size-10',
    headlessCreationTimestamp: `
        leading-[--message-line-height]
        opacity-100
        group-hover-focus-within/message:opacity-100
    `,
    secondCol: 'w-full pr-6',
    infoRow: 'flex items-center gap-2',
});

export const CozyMessage: FC = () => {
    const { message, isGroupHead } = useMessageContext();

    const avatar = Store.useSelector(
        Store.Users.Selectors.selectAvatarById(message.author),
    );

    const defaultAvatar = Store.useSelector(
        Store.Users.Selectors.selectDefaultAvatarById(message.author),
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.firstCol}>
                <If condition={isGroupHead}>
                    <Avatar.User
                        className={styles.avatar}
                        avatar={avatar}
                        defaultAvatar={defaultAvatar}
                    />
                </If>

                <If condition={!isGroupHead}>
                    <MessageCreatedTimestamp className={styles.headlessCreationTimestamp}>
                        {formatSimpleTimestamp(message.createdAt)}
                    </MessageCreatedTimestamp>
                </If>
            </div>

            <div className={styles.secondCol}>
                <If condition={isGroupHead}>
                    <div className={styles.infoRow}>
                        <MessageUsername/>

                        <MessageCreatedTimestamp>
                            {formatCreationTimestamp(message.createdAt)}
                        </MessageCreatedTimestamp>
                    </div>
                </If>

                <MessageContent/>

                <MessageAdditions/>
            </div>
        </div>
    );
};