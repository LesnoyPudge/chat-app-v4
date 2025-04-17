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
    firstCol: 'flex w-[72px] shrink-0 items-start justify-end pr-4',
    avatar: 'size-10',
    headlessCreationTimestamp: `
        text-xs 
        font-medium 
        leading-none 
        text-color-muted 
        opacity-0
        group-hover-focus-within/message:opacity-100
    `,
    secondCol: 'w-full',
    infoRow: 'flex gap-2',
    username: 'font-medium text-color-primary',
    groupHeadTimestamp: 'self-center text-xs font-medium text-color-muted',
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
                    <div>
                        <MessageCreatedTimestamp className={styles.headlessCreationTimestamp}>
                            {formatSimpleTimestamp(message.createdAt)}
                        </MessageCreatedTimestamp>
                    </div>
                </If>
            </div>

            <div className={styles.secondCol}>
                <If condition={isGroupHead}>
                    <div className={styles.infoRow}>
                        <MessageUsername className={styles.username}/>

                        <MessageCreatedTimestamp className={styles.groupHeadTimestamp}>
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