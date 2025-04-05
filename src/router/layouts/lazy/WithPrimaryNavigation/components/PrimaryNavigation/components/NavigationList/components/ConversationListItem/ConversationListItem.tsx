import { Avatar, Button, KeyboardNavigation, MobileMenu, Overlay } from '@/components';
import { useFunction, useRefManager, withDisplayName } from '@lesnoypudge/utils-react';
import { cn } from '@/utils';
import { WrapperWithBullet } from '../../../WrapperWithBullet';
import { sharedStyles } from '../../../../sharedStyles';
import { Navigator, Store } from '@/features';
import { ConversationContextMenu } from './components';
import { decorate } from '@lesnoypudge/macro';
import { FC, memo } from 'react';



export namespace ConversationListItem {
    export type Props = {
        conversationId: string;
    };
}

decorate(withDisplayName, 'ConversationListItem', decorate.target);
decorate(memo, decorate.target);

export const ConversationListItem: FC<ConversationListItem.Props> = ({
    conversationId,
}) => {
    const buttonRef = useRefManager<HTMLButtonElement>(null);
    const { navigateTo } = Navigator.useNavigateTo();
    const { closeMenu } = MobileMenu.useMobileMenu();
    const isInConversation = Navigator.useIsLocation((v) => {
        return v.conversation({ conversationId });
    });

    const userTarget = Store.useSelector(
        Store.Conversations.Selectors
            .selectSecondConversationMemberById(conversationId),
    );

    const notificationsCount = Store.useSelector(
        Store.Conversations.Selectors
            .selectNotificationCountById(conversationId),
    );

    const {
        isFocused,
        setFocusId,
        tabIndex,
    } = KeyboardNavigation.useCommonItem({
        elementRef: buttonRef,
        itemId: conversationId,
    });

    const navigateToServer = useFunction(() => {
        navigateTo.conversation({ conversationId });
        closeMenu();
    });

    const shouldShowTooltip = !!userTarget;
    const isActive = isFocused || isInConversation;

    return (
        <WrapperWithBullet
            isActive={isActive}
            withNotifications={!!notificationsCount}
        >
            <Button
                className={sharedStyles.button}
                tabIndex={tabIndex}
                label={userTarget?.name}
                isActive={isActive}
                innerRef={buttonRef}
                onLeftClick={navigateToServer}
                onAnyClick={setFocusId}
            >
                <Avatar.WithBadge.Notifications
                    count={notificationsCount}
                >
                    <Avatar.User
                        className={cn(
                            sharedStyles.avatar.base,
                            isInConversation && sharedStyles.avatar.active,
                        )}
                        avatar={userTarget?.avatar}
                        defaultAvatar={userTarget?.defaultAvatar}
                    />
                </Avatar.WithBadge.Notifications>
            </Button>

            <If condition={shouldShowTooltip}>
                <Overlay.Tooltip
                    preferredAlignment='right'
                    leaderElementRef={buttonRef}
                >
                    {userTarget?.name}
                </Overlay.Tooltip>

                <ConversationContextMenu
                    conversationId={conversationId}
                    leaderElementRef={buttonRef}
                />
            </If>
        </WrapperWithBullet>
    );
};