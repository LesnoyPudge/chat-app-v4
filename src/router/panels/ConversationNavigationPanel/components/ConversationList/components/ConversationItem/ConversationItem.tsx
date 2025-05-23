import {
    Avatar,
    Button,
    Placeholder,
    Sprite,
    Overlay,
    KeyboardNavigation,
    MobileMenu,
    VirtualList,
} from '@/components';
import { Navigator, Store } from '@/features';
import { ASSETS } from '@/generated/ASSETS';
import { useTrans } from '@/hooks';
import {
    useFunction,
    useRefManager,
    withDisplayName,
} from '@lesnoypudge/utils-react';
import { cn, createStyles } from '@/utils';
import { decorate } from '@lesnoypudge/macro';
import { FC, memo, startTransition } from 'react';



const styles = createStyles({
    wrapper: `
        group 
        relative 
        mt-1
        ${VirtualList.Styles.resetItemMarginTop}
    `,
    userInfoButton: `
        flex 
        h-[42px]
        w-full 
        items-center 
        gap-3 
        rounded-sm
        px-2 
        py-1
        data-[active=true]:bg-primary-hover 
        data-[active=true]:pr-10
        group-hover-focus-within:bg-primary-hover
        group-hover-focus-within:pr-10
    `,
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
    export type Props = {
        id: string;
    };
}

decorate(withDisplayName, 'ConversationItem', decorate.target);
decorate(memo, decorate.target);

export const ConversationItem: FC<ConversationItem.Props> = ({
    id: conversationId,
}) => {
    const mainButtonRef = useRefManager<HTMLButtonElement>(null);
    const hideButtonRef = useRefManager<HTMLButtonElement>(null);
    const { t } = useTrans();
    const { navigateTo } = Navigator.useNavigateTo();
    const { closeMenu } = MobileMenu.useMobileMenu();
    const isInConversation = Navigator.useIsLocation((v) => {
        return v.conversation({ conversationId });
    });

    const { setId, tabIndex } = KeyboardNavigation.useCommonItem({
        elementRef: mainButtonRef,
        itemId: conversationId,
    });

    const userTarget = Store.useSelector(
        Store.Conversations.Selectors
            .selectSecondConversationMemberById(conversationId),
    );

    const [
        hideTrigger,
        hideHelpers,
    ] = Store.Users.Api.useUserHideConversationMutation();

    const handleNavigate = useFunction(() => {
        navigateTo.conversation({ conversationId });
        startTransition(closeMenu);
    });

    const handleHide = useFunction(() => {
        void hideTrigger({ conversationId }).unwrap().then(() => {
            navigateTo.root();
        });
    });

    return (
        <li className={styles.wrapper}>
            <Button
                className={styles.userInfoButton}
                isActive={isInConversation}
                onAnyClick={setId}
                onLeftClick={handleNavigate}
                innerRef={mainButtonRef}
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

                <Placeholder.With reveal={userTarget}>
                    {(userTarget) => (
                        <span
                            className={cn(
                                styles.username.base,
                                isInConversation && styles.username.active,
                            )}
                        >
                            {userTarget.name}
                        </span>
                    )}
                </Placeholder.With>
            </Button>

            <Button
                className={cn(
                    styles.hideButton.base,
                    isInConversation && styles.hideButton.active,
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

            <Overlay.Tooltip
                preferredAlignment='right'
                leaderElementRef={hideButtonRef}
            >
                {t('COMMON.Hide')}
            </Overlay.Tooltip>
        </li>
    );
};