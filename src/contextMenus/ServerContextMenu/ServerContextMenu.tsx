import { Button, ContextMenu } from '@components';
import { useOptimisticQueue, useTrans } from '@hooks';

import { useFunction } from '@lesnoypudge/utils-react';
import { Features } from '@redux/features';
import { useStoreSelector } from '@redux/hooks';
import { FC } from 'react';



export namespace ServerContextMenu {
    export type Props = {
        serverId: string;
    };
}

export const ServerContextMenu: FC<ServerContextMenu.Props> = ({
    serverId,
}) => {
    const { t } = useTrans();
    const [mute] = Features.Users.Api.useMuteServerMutation();
    const [unmute] = Features.Users.Api.useUnmuteServerMutation();
    const [
        leaveTrigger,
        leaveHelpers,
    ] = Features.Servers.Api.useLeaveMutation();

    const leave = useFunction(() => {
        void leaveTrigger({ serverId });
    });

    const [
        markAsReadTrigger,
        markAsReadHelpers,
    ] = Features.Users.Api.useMarkServerNotificationsAsReadMutation();

    const markAsRead = useFunction(() => {
        void markAsReadTrigger({ serverId });
    });

    const hasNotifications = !!useStoreSelector(
        Features.Servers.StoreSelectors.selectNotificationCountById(
            serverId,
        ),
    );

    const isMuted = useStoreSelector(
        Features.Servers.StoreSelectors.selectIsMutedById(serverId),
    );

    const isMutedOptimistic = useOptimisticQueue(isMuted, [
        ['mute', () => true, () => mute({ serverId })],
        ['unmute', () => false, () => unmute({ serverId })],
    ]);

    const toggleNotification = useFunction(() => {
        return (
            isMutedOptimistic.value
                ? isMutedOptimistic.trigger('unmute')
                : isMutedOptimistic.trigger('mute')
        );
    });

    const serverNotificationToggleText = (
        isMutedOptimistic.value
            ? t('ServerContextMenu.NotificationButton.text.unmute')
            : t('ServerContextMenu.NotificationButton.text.mute')
    );

    const isMarkAsReadButtonDisabled = (
        !hasNotifications
        || markAsReadHelpers.isLoading
    );

    return (
        <ContextMenu.Container
            label={t('ServerContextMenu.label')}
        >
            <Button
                className={ContextMenu.menuItemStyles}
                {...ContextMenu.menuItemProps}
                onLeftClick={toggleNotification}
            >
                {serverNotificationToggleText}
            </Button>

            <Button
                className={ContextMenu.menuItemStyles}
                {...ContextMenu.menuItemProps}
                isDisabled={isMarkAsReadButtonDisabled}
                onLeftClick={markAsRead}
            >
                {t('ServerContextMenu.readNotificationsButton.text')}
            </Button>

            <Button
                className={ContextMenu.menuItemStyles}
                {...ContextMenu.menuItemProps}
                onLeftClick={leave}
                isLoading={leaveHelpers.isLoading}
            >
                {t('ServerContextMenu.leaveButton.text')}
            </Button>
        </ContextMenu.Container>
    );
};