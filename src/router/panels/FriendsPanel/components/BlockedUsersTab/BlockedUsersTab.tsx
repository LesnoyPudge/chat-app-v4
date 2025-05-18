import { FC } from 'react';
import { BaseActionButton, List, ListItem } from '../components';
import { useTrans } from '@/hooks';
import { Store } from '@/features';
import { useFunction } from '@lesnoypudge/utils-react';
import { ASSETS } from '@/generated/ASSETS';
import { FriendsPanelTabs } from '../../FriendsPanel';
import { sharedStyles } from '../../sharedStyles';
import { useContentContextSelector } from '../ContentContext';



const ActionButtons: FC<Pick<BaseActionButton.Props, 'userId'>> = ({
    userId,
}) => {
    const { t } = useTrans();

    const [
        unblockTrigger,
        unblockHelpers,
    ] = Store.Users.Api.useUserUnblockMutation();

    const handleUnblock = useFunction(() => {
        if (unblockHelpers.isLoading) return;

        void unblockTrigger({ targetId: userId });
    });

    return (
        <BaseActionButton
            label={t('FriendsPanel.AllFriends.unblockButton.label')}
            onClick={handleUnblock}
            sprite={ASSETS.IMAGES.SPRITE.UNBLOCK_ICON}
            tooltip={t('FriendsPanel.AllFriends.unblockButton.tooltip')}
            userId={userId}
            isLoading={unblockHelpers.isLoading}
        />
    );
};

export const BlockedUsersTab: FC = () => {
    const filteredBlockedIds = useContentContextSelector((v) => {
        return v.filteredBlockedIds;
    });

    const blockedIds = useContentContextSelector((v) => {
        return v.blockedIds;
    });

    Store.Users.Api.useUserGetManyQuery({
        userIds: blockedIds,
    }, { skip: !blockedIds.length });

    return (
        <FriendsPanelTabs.Panel.Blocked className={sharedStyles.tabWrapper}>
            <List userIds={filteredBlockedIds}>
                {(id) => (
                    <ListItem
                        userId={id}
                        renderActionButtons={(id) => (
                            <ActionButtons userId={id}/>
                        )}
                    />
                )}
            </List>
        </FriendsPanelTabs.Panel.Blocked>
    );
};