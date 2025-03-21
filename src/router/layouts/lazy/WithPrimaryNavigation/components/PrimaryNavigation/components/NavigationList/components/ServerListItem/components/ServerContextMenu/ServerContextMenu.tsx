import { Button, ActionMenu, Overlay } from '@/components';
import { useOptimisticQueue, useTrans } from '@/hooks';
import { useFunction } from '@lesnoypudge/utils-react';
import { withDisplayNameAndDecorator } from '@/utils';
import { Store } from '@/features';



const {
    withDecorator,
} = withDisplayNameAndDecorator<Overlay.Menu.Types.PublicPropsContextMenu>(
    'ServerContextMenu',
    ({
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
    },
);

export namespace ServerContextMenu {
    export type Props = {
        serverId: string;
    };
}

export const ServerContextMenu = withDecorator<
    ServerContextMenu.Props
>(({ serverId }) => {
    const { t } = useTrans();
    const [mute] = Store.Users.Api.useMuteServerMutation();
    const [unmute] = Store.Users.Api.useUnmuteServerMutation();
    const [
        leaveTrigger,
        leaveHelpers,
    ] = Store.Servers.Api.useLeaveMutation();

    const leave = useFunction(() => {
        void leaveTrigger({ serverId });
    });

    const [
        markAsReadTrigger,
        markAsReadHelpers,
    ] = Store.Users.Api.useMarkServerNotificationsAsReadMutation();

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