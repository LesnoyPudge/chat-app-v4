import { FC } from 'react';
import { BaseActionButton, List, ListItem } from '../components';
import { useTrans } from '@/hooks';
import { Store } from '@/features';
import { ASSETS } from '@/generated/ASSETS';
import { useFunction, useLatest } from '@lesnoypudge/utils-react';
import { FriendsPanelTabs } from '../../FriendsPanel';
import { sharedStyles } from '../../sharedStyles';
import { useContentContextSelector } from '../ContentContext';



type Props = (
    Pick<BaseActionButton.Props, 'userId'>
    & {
        type: 'incoming' | 'outgoing';
    }
);

const ActionButtons: FC<Props> = ({
    userId,
    type,
}) => {
    const { t } = useTrans();

    const [
        acceptTrigger,
        acceptHelpers,
    ] = Store.Users.Api.useUserAcceptFriendRequestMutation();

    const [
        rejectTrigger,
        rejectHelpers,
    ] = Store.Users.Api.useUserRejectFriendRequestMutation();

    const [
        revokeTrigger,
        revokeHelpers,
    ] = Store.Users.Api.useUserRevokeFriendRequestMutation();

    const handleAccept = useFunction(() => {
        if (acceptHelpers.isLoading) return;

        void acceptTrigger({ targetId: userId });
    });

    const handleReject = useFunction(() => {
        if (rejectHelpers.isLoading) return;

        void rejectTrigger({ targetId: userId });
    });

    const handleRevoke = useFunction(() => {
        if (revokeHelpers.isLoading) return;

        void revokeTrigger({ targetId: userId });
    });

    const isIncoming = type === 'incoming';

    return (
        <>
            <If condition={isIncoming}>
                <BaseActionButton
                    label={t('FriendsPanel.PendingRequests.incoming.acceptButton.label')}
                    onClick={handleAccept}
                    sprite={ASSETS.IMAGES.SPRITE.CHECK_ICON}
                    tooltip={t('FriendsPanel.PendingRequests.incoming.acceptButton.tooltip')}
                    userId={userId}
                    isLoading={acceptHelpers.isLoading}
                />

                <BaseActionButton
                    label={t('FriendsPanel.PendingRequests.incoming.rejectButton.label')}
                    onClick={handleReject}
                    sprite={ASSETS.IMAGES.SPRITE.CROSS_ICON}
                    tooltip={t('FriendsPanel.PendingRequests.incoming.rejectButton.tooltip')}
                    userId={userId}
                    isLoading={rejectHelpers.isLoading}
                />
            </If>

            <If condition={!isIncoming}>
                <BaseActionButton
                    label={t('FriendsPanel.PendingRequests.outgoing.revokeButton.label')}
                    onClick={handleRevoke}
                    sprite={ASSETS.IMAGES.SPRITE.CROSS_ICON}
                    tooltip={t('FriendsPanel.PendingRequests.outgoing.revokeButton.tooltip')}
                    userId={userId}
                    isLoading={revokeHelpers.isLoading}
                />
            </If>
        </>
    );
};

export const PendingRequestsTab: FC = () => {
    const { t } = useTrans();

    const pendingIds = useContentContextSelector((v) => v.pendingIds);
    const incomingIds = useContentContextSelector((v) => v.incomingIds);
    const filteredPendingIds = useContentContextSelector((v) => {
        return v.filteredPendingIds;
    });

    Store.Users.Api.useUserGetManyQuery({
        userIds: pendingIds,
    }, { skip: !pendingIds.length });

    const incomingSet = useLatest(new Set(incomingIds));

    const getType = useFunction((id: string) => {
        return incomingSet.current.has(id) ? 'incoming' : 'outgoing';
    });

    const getExtraInfo = useFunction((id: string) => {
        return incomingSet.current.has(id)
            ? t('FriendsPanel.PendingRequests.incoming.extraInfo')
            : t('FriendsPanel.PendingRequests.outgoing.extraInfo');
    });

    return (
        <FriendsPanelTabs.Panel.Pending className={sharedStyles.tabWrapper}>
            <List userIds={filteredPendingIds}>
                {(id) => (
                    <ListItem
                        userId={id}
                        renderActionButtons={(id) => (
                            <ActionButtons
                                userId={id}
                                type={getType(id)}
                            />
                        )}
                        renderExtraInfo={getExtraInfo}
                    />
                )}
            </List>
        </FriendsPanelTabs.Panel.Pending>
    );
};