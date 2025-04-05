import { Avatar, Placeholder } from '@/components';
import { Navigator, Store } from '@/features';
import { useTrans } from '@/hooks';
import { TopBar } from '@/router/layouts/bundled';
import { createStyles } from '@/utils';
import { Heading, Hidden } from '@lesnoypudge/utils-react';
import { FC } from 'react';



const styles = createStyles({
    wrapper: 'gap-1.5 px-4',
    avatar: 'size-6',
    heading: 'truncate font-bold text-color-primary',
});

export const Header: FC = () => {
    const { conversationId } = Navigator.useParams('conversation');
    const { t } = useTrans();

    const user = Store.useSelector(
        Store.Conversations.Selectors
            .selectSecondConversationMemberById(conversationId),
    );

    return (
        <TopBar
            className={styles.wrapper}
            withMobileButton
        >
            <Avatar.WithBadge.Status
                className={styles.avatar}
                status={user?.status}
                extraStatus={user?.extraStatus}
            >
                <Avatar.User
                    avatar={user?.avatar}
                    defaultAvatar={user?.defaultAvatar}
                />
            </Avatar.WithBadge.Status>

            <Placeholder.With reveal={user}>
                {(user) => (
                    <Heading.Node className={styles.heading}>
                        <Hidden.Visually>
                            {t('ConversationPanel.Header.heading', {
                                name: user.name,
                            })}
                        </Hidden.Visually>

                        <Hidden.Accessibly>
                            {user.name}
                        </Hidden.Accessibly>
                    </Heading.Node>
                )}
            </Placeholder.With>
        </TopBar>
    );
};