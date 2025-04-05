import { Button, Overlay, Placeholder, VirtualList, KeyboardNavigation, Avatar } from '@/components';
import { FC, memo } from 'react';
import { Store } from '@/features';
import { useRefManager, withDisplayName, useFunction } from '@lesnoypudge/utils-react';
import { createStyles } from '@/utils';
import { useTrans, useIsCurrentUser } from '@/hooks';
import { decorate } from '@lesnoypudge/macro';
import { MemberActionMenu } from './components';



const styles = createStyles({
    wrapper: `
        mt-0.5
        ${VirtualList.Styles.resetItemMarginTop}
        flex 
        items-center 
        gap-3 
        py-1 
        pl-4
        pr-2
        text-color-muted
        data-[active=true]:bg-primary-active
        hover-focus-visible:bg-primary-hover
        hover-focus-visible:text-color-primary
    `,
    avatarWrapper: 'size-8',
    username: 'truncate',
});

export namespace MemberItem {
    export type Props = {
        userId: string;
    };
}

decorate(withDisplayName, 'MemberItem', decorate.target);
decorate(memo, decorate.target);

export const MemberItem: FC<MemberItem.Props> = ({
    userId,
}) => {
    const { t } = useTrans();
    const controls = Overlay.useControls();
    const wrapperRef = useRefManager<HTMLButtonElement>(null);
    const {
        setFocusId,
        tabIndex,
        isFocused,
    } = KeyboardNavigation.useCommonItem({
        elementRef: wrapperRef,
        itemId: userId,
    });

    const { isCurrentUser } = useIsCurrentUser(userId);

    const user = Store.useSelector(
        Store.Users.Selectors.selectById(userId),
    );

    const handleClick = useFunction(() => {
        if (isCurrentUser) return;

        controls.open();
    });

    const isActive = isFocused || controls.isOpen;

    return (
        <>
            <Button
                className={styles.wrapper}
                isActive={isActive}
                tabIndex={tabIndex}
                innerRef={wrapperRef}
                label={t('ChannelPanel.MemberItem.label', {
                    name: user?.name,
                })}
                onLeftClick={handleClick}
                onAnyClick={setFocusId}
            >
                <Avatar.WithBadge.Status
                    className={styles.avatarWrapper}
                    status={user?.status}
                    extraStatus={user?.extraStatus}
                    withTooltip
                >
                    <Avatar.User
                        avatar={user?.avatar}
                        defaultAvatar={user?.defaultAvatar}
                    />
                </Avatar.WithBadge.Status>

                <Placeholder.With reveal={!!user}>
                    <span className={styles.username}>
                        {user?.name}
                    </span>
                </Placeholder.With>
            </Button>

            <If condition={!isCurrentUser}>
                <MemberActionMenu
                    leaderElementOrRectRef={wrapperRef}
                    userId={userId}
                    controls={controls}
                />
            </If>
        </>
    );
};