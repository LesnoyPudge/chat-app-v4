import { Avatar, Button, ListVariants, Placeholder, Sprite, Tooltip } from '@components';
import { Navigator } from '@features';
import { ASSETS } from '@generated/ASSETS';
import { useTrans } from '@i18n';
import { useFunction, useRefManager } from '@lesnoypudge/utils-react';
import { Features } from '@redux/features';
import { useSliceSelector } from '@redux/hooks';
import { cn, createStyles } from '@utils';
import { FC } from 'react';



const styles = createStyles({
    wrapper: 'group relative',
    userInfoButton: {
        base: `
            flex 
            h-[42px]
            w-full 
            items-center 
            gap-3 
            rounded-sm
            px-2 
            py-1
            group-hover-focus-within:bg-primary-hover 
            group-hover-focus-within:pr-10`,
        active: 'bg-primary-hover pr-10',
    },
    avatar: 'size-8',
    username: {
        base: `
            truncate 
            text-start 
            font-medium 
            text-color-muted
            group-hover-focus-within:text-color-base
        `,
        active: 'text-color-base',
    },
    hideButton: {
        base: `
            absolute 
            right-2 
            top-1/2 
            flex 
            size-7 
            shrink-0 
            -translate-y-1/2 
            fill-icon-300 
            opacity-0 
            hover-focus-visible:fill-icon-100 
            group-hover-focus-within:opacity-100
        `,
        active: 'opacity-100',
    },
    hideIcon: 'm-auto h-5 w-5 transition-none',
});

export namespace ConversationItem {
    export type Props = ListVariants.Variant1.Types.ChildrenProps<string>;
}

export const ConversationItem: FC<ConversationItem.Props> = ({
    isFocused,
    tabIndex,
    id,
    itemRef,
    setFocusId,
}) => {
    const conversationId = id;

    const { t } = useTrans();
    const hideButtonRef = useRefManager<HTMLButtonElement>(null);
    const { navigateTo, myLocationIs } = Navigator.useNavigator();

    const conversation = useSliceSelector(
        Features.Conversations.Slice,
        Features.Conversations.Slice.selectors.selectById(conversationId),
    );

    const userId = useSliceSelector(
        Features.App.Slice,
        Features.App.Slice.selectors.selectUserId(),
    );

    const userTarget = useSliceSelector(
        Features.Users.Slice,
        Features.Users.Slice.selectors.selectById(
            conversation?.members.find((id) => id !== userId),
        ),
    );

    const [
        hideTrigger,
        hideHelpers,
    ] = Features.Users.Api.useHideConversationMutation();

    const isActive = myLocationIs.conversation({ conversationId });
    const shouldHighlight = isActive || isFocused;

    const handleNavigate = useFunction(() => {
        void navigateTo.conversation({ conversationId });
    });

    const handleHide = useFunction(() => {
        void hideTrigger({ conversationId });
    });

    return (
        <li className={styles.wrapper}>
            <Button
                className={cn(
                    styles.userInfoButton.base,
                    shouldHighlight && styles.userInfoButton.active,
                )}
                isActive={shouldHighlight}
                onAnyClick={setFocusId}
                onLeftClick={handleNavigate}
                innerRef={itemRef}
                label={t('ConversationNavigation.Item.navigateToMessagesButton.label', { name: userTarget?.name })}
                tabIndex={tabIndex}
            >
                <Avatar.WithBadge.Status
                    className={styles.avatar}
                    status={userTarget?.status}
                    extraStatus={userTarget?.extraStatus}
                    withTooltip
                >
                    <Avatar.User
                        avatar={userTarget?.avatar}
                        defaultAvatar={userTarget?.defaultAvatar}
                    />
                </Avatar.WithBadge.Status>

                <Placeholder.With reveal={!!userTarget}>
                    <span
                        className={cn(
                            styles.username.base,
                            shouldHighlight && styles.username.active,
                        )}
                    >
                        {userTarget?.name}
                    </span>
                </Placeholder.With>
            </Button>

            <Button
                className={cn(
                    styles.hideButton.base,
                    shouldHighlight && styles.hideButton.active,
                )}
                tabIndex={tabIndex}
                innerRef={hideButtonRef}
                label={t('ConversationNavigation.Item.hideButton.label', { name: userTarget?.name })}
                isLoading={hideHelpers.isLoading}
                onLeftClick={handleHide}
            >
                <Sprite
                    className={styles.hideIcon}
                    sprite={ASSETS.IMAGES.SPRITE.CROSS_ICON}
                />
            </Button>

            <Tooltip
                preferredAlignment='right'
                leaderElementRef={hideButtonRef}
            >
                {t('COMMON.Hide')}
            </Tooltip>
        </li>
    );
};