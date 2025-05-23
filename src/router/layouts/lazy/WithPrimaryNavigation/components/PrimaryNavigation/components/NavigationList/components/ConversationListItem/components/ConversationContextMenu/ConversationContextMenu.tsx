import { ActionMenu, Button, Overlay } from '@/components';
import { useOptimisticQueue, useTrans } from '@/hooks';
import {
    createWithDecorator,
    useFunction,
    withDisplayName,
} from '@lesnoypudge/utils-react';
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
            label={t('ConversationContextMenu.label')}
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

export namespace ConversationContextMenu {
    export type Props = {
        conversationId: string;
    };
}

decorate(withDisplayName, 'ConversationContextMenu', decorate.target);

export const ConversationContextMenu = withDecorator<
    ConversationContextMenu.Props
>(({ conversationId }) => {
    const { t } = useTrans();
    const [mute] = Store.Users.Api.useUserMuteConversationMutation();
    const [unmute] = Store.Users.Api.useUserUnmuteConversationMutation();
    const [
        hideTrigger,
        hideHelpers,
    ] = Store.Users.Api.useUserHideConversationMutation();

    const hide = useFunction(() => {
        void hideTrigger({ conversationId });
    });

    const [
        markAsReadTrigger,
        markAsReadHelpers,
    ] = Store.Users.Api.useUserMarkConversationNotificationsAsReadMutation();

    const markAsRead = useFunction(() => {
        void markAsReadTrigger({ conversationId });
    });

    const hasNotifications = !!Store.useSelector(
        Store.Conversations.Selectors.selectNotificationCountById(
            conversationId,
        ),
    );

    const isMuted = Store.useSelector(
        Store.Conversations.Selectors.selectIsMutedById(conversationId),
    );

    const isMutedOptimistic = useOptimisticQueue(isMuted, [
        ['mute', () => true, () => mute({ conversationId })],
        ['unmute', () => false, () => unmute({ conversationId })],
    ]);

    const toggleNotification = useFunction(() => {
        return (
            isMutedOptimistic.value
                ? isMutedOptimistic.trigger('unmute')
                : isMutedOptimistic.trigger('mute')
        );
    });

    const conversationNotificationToggleText = (
        isMutedOptimistic.value
            ? t('ConversationContextMenu.NotificationButton.text.unmute')
            : t('ConversationContextMenu.NotificationButton.text.mute')
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
                {conversationNotificationToggleText}
            </Button>

            <Button
                className={ActionMenu.styles.button}
                {...ActionMenu.buttonProps}
                isDisabled={isMarkAsReadButtonDisabled}
                onLeftClick={markAsRead}
            >
                {t('ConversationContextMenu.readNotificationsButton.text')}
            </Button>

            <Button
                className={ActionMenu.styles.button}
                {...ActionMenu.buttonProps}
                onLeftClick={hide}
                isLoading={hideHelpers.isLoading}
            >
                {t('ConversationContextMenu.hideButton.text')}
            </Button>
        </ActionMenu.Wrapper>
    );
});