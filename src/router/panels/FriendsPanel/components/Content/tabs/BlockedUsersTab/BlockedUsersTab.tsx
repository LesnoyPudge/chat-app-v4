import { FC } from 'react';
import { BaseActionButton, List, ListItem } from '../components';
import { useTrans } from '@/hooks';
import { Store } from '@/features';
import { useFunction } from '@lesnoypudge/utils-react';
import { ASSETS } from '@/generated/ASSETS';



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
    const blocked = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserBlockedIds,
    );

    Store.Users.Api.useUserGetManyQuery({
        userIds: blocked,
    }, { skip: !blocked.length });

    return (
        <List userIds={blocked}>
            {(id) => (
                <ListItem
                    userId={id}
                    renderActionButtons={(id) => <ActionButtons userId={id}/>}
                />
            )}
        </List>
    );
};