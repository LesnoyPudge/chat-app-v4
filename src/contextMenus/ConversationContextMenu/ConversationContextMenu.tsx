import { Button, Overlay } from '@components';
import { useOptimisticQueue, useTrans } from '@hooks';

import { useFunction } from '@lesnoypudge/utils-react';
import { Features } from '@redux/features';
import { useStoreSelector } from '@redux/hooks';
import { FC } from 'react';



export namespace ConversationContextMenu {
    export type Props = {
        conversationId: string;
    };
}

export const ConversationContextMenu: FC<ConversationContextMenu.Props> = ({
    conversationId,
}) => {
    const { t } = useTrans();
    const [mute] = Features.Users.Api.useMuteConversationMutation();
    const [unmute] = Features.Users.Api.useUnmuteConversationMutation();
    const [
        hideTrigger,
        hideHelpers,
    ] = Features.Users.Api.useHideConversationMutation();

    const hide = useFunction(() => {
        void hideTrigger({ conversationId });
    });

    const [
        markAsReadTrigger,
        markAsReadHelpers,
    ] = Features.Users.Api.useMarkConversationNotificationsAsReadMutation();

    const markAsRead = useFunction(() => {
        void markAsReadTrigger({ conversationId });
    });

    const hasNotifications = !!useStoreSelector(
        Features.Conversations.StoreSelectors.selectNotificationCountById(
            conversationId,
        ),
    );

    const isMuted = useStoreSelector(
        Features.Conversations.StoreSelectors.selectIsMutedById(conversationId),
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
        <Overlay.Menu.Provider
            label={t('ConversationContextMenu.label')}

        >
            <Overlay.Menu.Wrapper>
                <Button
                    className={ContextMenu.menuItemStyles}
                    {...ContextMenu.menuItemProps}
                    onLeftClick={toggleNotification}
                >
                    {conversationNotificationToggleText}
                </Button>

                <Button
                    className={ContextMenu.menuItemStyles}
                    {...ContextMenu.menuItemProps}
                    isDisabled={isMarkAsReadButtonDisabled}
                    onLeftClick={markAsRead}
                >
                    {t('ConversationContextMenu.readNotificationsButton.text')}
                </Button>

                <Button
                    className={ContextMenu.menuItemStyles}
                    {...ContextMenu.menuItemProps}
                    onLeftClick={hide}
                    isLoading={hideHelpers.isLoading}
                >
                    {t('ConversationContextMenu.hideButton.text')}
                </Button>
            </Overlay.Menu.Wrapper>
        </Overlay.Menu.Provider>
    );
};