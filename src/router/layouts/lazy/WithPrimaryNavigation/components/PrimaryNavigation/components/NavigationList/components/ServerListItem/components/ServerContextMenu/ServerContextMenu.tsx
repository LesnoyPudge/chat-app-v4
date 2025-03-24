import { Button, ActionMenu, Overlay } from '@/components';
import { useOptimisticQueue, useTrans } from '@/hooks';
import { createWithDecorator, useFunction, withDisplayName } from '@lesnoypudge/utils-react';
import { Store } from '@/features';
import { decorate } from '@lesnoypudge/macro';



const {
    withDecorator,
} = createWithDecorator<Overlay.Menu.Types.PublicPropsContextMenu>(({
    children,
    leaderElementRef,
}) => {
    const {
        controls,
        leaderElementOrRectRef,
    } = Overlay.Menu.useContextMenuControls({ leaderElementRef });
    const { t } = useTrans();

    return (
        <Overlay.Menu.Provider
            label={t('ServerContextMenu.label')}
            controls={controls}
            preferredAlignment='right'
            leaderElementOrRectRef={leaderElementOrRectRef}
        >
            <Overlay.Menu.Wrapper>
                {children}
            </Overlay.Menu.Wrapper>
        </Overlay.Menu.Provider>
    );
});

export namespace ServerContextMenu {
    export type Props = {
        serverId: string;
    };
}

decorate(withDisplayName, 'ServerContextMenu', decorate.target);

export const ServerContextMenu = withDecorator<
    ServerContextMenu.Props
>(({ serverId }) => {
    const { t } = useTrans();
    const [mute] = Store.Users.Api.useUserMuteServerMutation();
    const [unmute] = Store.Users.Api.useUserUnmuteServerMutation();
    const [
        leaveTrigger,
        leaveHelpers,
    ] = Store.Servers.Api.useServerLeaveMutation();

    const leave = useFunction(() => {
        void leaveTrigger({ serverId });
    });

    const [
        markAsReadTrigger,
        markAsReadHelpers,
    ] = Store.Users.Api.useUserMarkServerNotificationsAsReadMutation();

    const markAsRead = useFunction(() => {
        void markAsReadTrigger({ serverId });
    });

    const hasNotifications = Store.useSelector(
        Store.Servers.Selectors.selectHasNotificationsById(
            serverId,
        ),
    );

    const isMuted = Store.useSelector(
        Store.Servers.Selectors.selectIsMutedById(serverId),
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
        <ActionMenu.Wrapper>
            <Button
                className={ActionMenu.styles.button}
                {...ActionMenu.buttonProps}
                onLeftClick={toggleNotification}
            >
                {serverNotificationToggleText}
            </Button>

            <Button
                className={ActionMenu.styles.button}
                {...ActionMenu.buttonProps}
                isDisabled={isMarkAsReadButtonDisabled}
                onLeftClick={markAsRead}
            >
                {t('ServerContextMenu.readNotificationsButton.text')}
            </Button>

            <Button
                className={ActionMenu.styles.button}
                {...ActionMenu.buttonProps}
                onLeftClick={leave}
                isLoading={leaveHelpers.isLoading}
            >
                {t('ServerContextMenu.leaveButton.text')}
            </Button>
        </ActionMenu.Wrapper>
    );
});