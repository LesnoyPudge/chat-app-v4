import { Avatar, Button, ContextMenu, Tooltip } from '@components';
import { Navigator } from '@entities';
import { useKeyboardNavigation } from '@hooks';
import { Focus, useFunction, useRefManager } from '@lesnoypudge/utils-react';
import { cn } from '@utils';
import { FC } from 'react';
import { WrapperWithBullet } from '../../../WrapperWithBullet';
import { Features } from '@redux/features';
import { useSliceSelector, useStoreSelector } from '@redux/hooks';
import { sharedStyles } from '../../../../sharedStyles';
import { ConversationContextMenu } from '@contextMenus';



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

export const ConversationListItem: FC<ConversationListItem.Props> = ({
    conversationId,
    isFocused,
    tabIndex,
    setCurrentFocusedId,
}) => {
    const buttonRef = useRefManager<HTMLButtonElement>(null);
    const { myLocationIs, navigateTo } = Navigator.useNavigator();
    const isInConversation = myLocationIs.conversation({ conversationId });

    const conversation = useSliceSelector(
        Features.Conversations.Slice,
        Features.Conversations.Slice.selectors.selectById(conversationId),
    );

    const userTarget = useSliceSelector(
        Features.Users.Slice,
        (state) => {
            if (!conversation) return;

            return Features.Users.Slice.selectors.selectById(
                conversation.user,
            )(state);
        },
    );

    const notificationsCount = useStoreSelector(
        Features.Conversations.StoreSelectors.selectNotificationCountById(conversationId),
    );

    const setFocused = useFunction(() => {
        setCurrentFocusedId(conversationId);
    });

    const navigateToServer = useFunction(() => {
        setFocused();
        void navigateTo.conversation({ conversationId });
    });

    const isUserAndConversationExist = userTarget && conversation;

    return (
        <Focus.Inside
            isEnabled={isFocused}
            containerRef={buttonRef}
        >
            <WrapperWithBullet isActive={isInConversation}>
                <Button
                    className={cn(
                        sharedStyles.button.base,
                        sharedStyles.brandButton.base,
                        isInConversation && sharedStyles.button.active,
                        isInConversation && sharedStyles.brandButton.active,
                    )}
                    tabIndex={tabIndex}
                    label={userTarget?.name}
                    role='menuitem'
                    isActive={isInConversation}
                    isDisabled={!isUserAndConversationExist}
                    innerRef={buttonRef}
                    onLeftClick={navigateToServer}
                    onAnyClick={setFocused}
                >
                    <Avatar.WithBadge.Notifications
                        count={notificationsCount}
                    >
                        <Avatar.User
                            className={sharedStyles.avatar}
                            avatar={userTarget?.avatar}
                            defaultAvatar={userTarget?.defaultAvatar}
                        />
                    </Avatar.WithBadge.Notifications>
                </Button>

                <If condition={!!isUserAndConversationExist}>
                    <Tooltip
                        preferredAlignment='right'
                        leaderElementRef={buttonRef}
                    >
                        {userTarget?.name}
                    </Tooltip>

                    <ContextMenu.Wrapper
                        leaderElementRef={buttonRef}
                        preferredAlignment='right'
                    >
                        <ConversationContextMenu conversationId={conversationId}/>
                    </ContextMenu.Wrapper>
                </If>
            </WrapperWithBullet>
        </Focus.Inside>
    );
};