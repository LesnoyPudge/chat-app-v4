import { Avatar, Button, Overlay } from '@/components';
import { useKeyboardNavigation } from '@/hooks';
import { Focus, useFunction, useRefManager, useScrollIntoView } from '@lesnoypudge/utils-react';
import { cn } from '@/utils';
import { FC, memo } from 'react';
import { WrapperWithBullet } from '../../../WrapperWithBullet';
import { Features } from '@/redux/features';
import { useSliceSelector, useStoreSelector } from '@/redux/hooks';
import { sharedStyles } from '../../../../sharedStyles';
import { Navigator } from '@/features';
import { ConversationContextMenu } from './components';



export namespace ConversationListItem {
    export type Props = (
        Pick<
            useKeyboardNavigation.Return,
            'setCurrentFocusedId'
        >
        & {
            conversationId: string;
            isFocused: boolean;
            tabIndex: number;
        }
    );
}

export const ConversationListItem: FC<ConversationListItem.Props> = memo(({
    conversationId,
    isFocused,
    tabIndex,
    setCurrentFocusedId,
}) => {
    const buttonRef = useRefManager<HTMLButtonElement>(null);
    const { navigateTo } = Navigator.useNavigateTo();
    const isInConversation = Navigator.useIsLocation((v) => {
        return v.conversation({ conversationId });
    });

    const conversation = useSliceSelector(
        Features.Conversations.Slice,
        Features.Conversations.Slice.selectors.selectById(conversationId),
    );

    const myId = useSliceSelector(
        Features.App.Slice,
        Features.App.Slice.selectors.selectUserId(),
    );

    const userTarget = useSliceSelector(
        Features.Users.Slice,
        (state) => {
            if (!conversation) return;
            if (!myId) return;

            const targetId = conversation.members.find((id) => id !== myId);
            if (!targetId) return;

            return Features.Users.Slice.selectors.selectById(targetId)(state);
        },
    );

    const notificationsCount = useStoreSelector(
        Features.Conversations.StoreSelectors.selectNotificationCountById(conversationId),
    );

    Focus.useMoveFocusInside({
        containerRef: buttonRef,
        isEnabled: isFocused,
    });

    useScrollIntoView(buttonRef, {
        enabled: isFocused,
    });

    const setFocused = useFunction(() => {
        setCurrentFocusedId(conversationId);
    });

    const navigateToServer = useFunction(() => {
        setFocused();
        navigateTo.conversation({ conversationId });
    });

    const isUserAndConversationExist = !!userTarget && !!conversation;

    return (
        <WrapperWithBullet
            isActive={isInConversation}
            withNotifications={!!notificationsCount}
        >
            <Button
                className={cn(
                    sharedStyles.button.base,
                    isInConversation && sharedStyles.button.active,
                )}
                tabIndex={tabIndex}
                label={userTarget?.name}
                role='menuitem'
                isActive={isInConversation}
                innerRef={buttonRef}
                onLeftClick={navigateToServer}
                onAnyClick={setFocused}
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
});