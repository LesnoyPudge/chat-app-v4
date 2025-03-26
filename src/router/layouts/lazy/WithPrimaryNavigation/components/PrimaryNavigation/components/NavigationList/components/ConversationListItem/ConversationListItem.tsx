import { Avatar, Button, KeyboardNavigation, Overlay } from '@/components';
import { useKeyboardNavigation } from '@/hooks';
import { Focus, useFunction, useRefManager, useScrollIntoView, withDisplayName } from '@lesnoypudge/utils-react';
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
    const isInConversation = Navigator.useIsLocation((v) => {
        return v.conversation({ conversationId });
    });

    const conversation = Store.useSelector(
        Store.Conversations.Selectors.selectById(conversationId),
    );

    const myId = Store.useSelector(
        Store.App.Selectors.selectUserId,
    );

    const userTarget = Store.useSelector(
        (state) => {
            if (!conversation) return;
            if (!myId) return;

            const targetId = conversation.members.find((id) => id !== myId);
            if (!targetId) return;

            return Store.Users.Selectors.selectById(targetId)(state);
        },
    );

    const notificationsCount = Store.useSelector(
        Store.Conversations.Selectors.selectNotificationCountById(conversationId),
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
    });

    const isUserAndConversationExist = !!userTarget && !!conversation;

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
                role='menuitem'
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

            <If condition={isUserAndConversationExist}>
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