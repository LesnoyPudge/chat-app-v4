import {
    Avatar,
    Button,
    KeyboardNavigation,
    Overlay,
    Sprite,
    VirtualList,
} from '@/components';
import { Store } from '@/features';
import { ASSETS } from '@/generated/ASSETS';
import { cn, createStyles } from '@/utils';
import { decorate } from '@lesnoypudge/macro';
import {
    useFunction,
    useRefManager,
    withDisplayName,
} from '@lesnoypudge/utils-react';
import { FC, memo } from 'react';
import {
    useServerSettingsDialogContextProxy,
} from '../../../../ServerSettingsDialog';
import { useTrans } from '@/hooks';
import { If } from '@lesnoypudge/react-if';



const styles = createStyles({
    item: {
        base: `
            ${VirtualList.Styles.resetItemMarginTop}
            mt-1 
            flex 
            justify-between 
            gap-1 
            rounded
            fill-icon-100
            p-1
            hover-focus-within:bg-primary-hover
            hover-focus-within:fill-danger
        `,
        active: 'bg-primary-hover fill-danger',
    },
    infoWrapper: 'flex items-center gap-1',
    buttonsWrapper: 'flex gap-1',
    avatar: 'size-10',
    username: 'truncate',
    button: 'size-10 rounded-full p-2',
    icon: 'size-full',
});

type Props = {
    userId: string;
};

decorate(withDisplayName, 'MemberItem', decorate.target);
decorate(memo, decorate.target);

export const MemberItem: FC<Props> = ({
    userId,
}) => {
    const { t } = useTrans();
    const { serverId } = useServerSettingsDialogContextProxy();
    const elementRef = useRefManager<HTMLLIElement>(null);
    const kickButtonRef = useRefManager<HTMLButtonElement>(null);
    const banButtonRef = useRefManager<HTMLButtonElement>(null);

    const currentUserId = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserId,
    );

    const {
        isCurrentId,
        setId,
        tabIndex,
    } = KeyboardNavigation.useCommonItem({
        itemId: userId,
        elementRef,
    });

    const avatar = Store.useSelector(
        Store.Users.Selectors.selectAvatarById(userId),
    );

    const defaultAvatar = Store.useSelector(
        Store.Users.Selectors.selectDefaultAvatarById(userId),
    );

    const name = Store.useSelector(
        Store.Users.Selectors.selectNameById(userId),
    );

    const [
        kickTrigger,
        kickHelpers,
    ] = Store.Servers.Api.useServerKickMemberMutation();

    const [
        banTrigger,
        banHelpers,
    ] = Store.Servers.Api.useServerBanMemberMutation();

    const handleKick = useFunction(() => {
        void kickTrigger({ serverId, targetId: userId });
    });

    const handleBan = useFunction(() => {
        void banTrigger({ serverId, targetId: userId });
    });

    const isCurrentUser = currentUserId === userId;

    return (
        <li
            className={cn(
                styles.item.base,
                isCurrentId && styles.item.active,
            )}
            ref={elementRef}
            tabIndex={tabIndex}
        >
            <div className={styles.infoWrapper}>
                <Avatar.User
                    className={styles.avatar}
                    avatar={avatar}
                    defaultAvatar={defaultAvatar}
                />

                <div className={styles.username}>
                    {name}
                </div>
            </div>

            <If condition={!isCurrentUser}>
                <div className={styles.buttonsWrapper}>
                    <Button
                        className={styles.button}
                        tabIndex={tabIndex}
                        isLoading={kickHelpers.isLoading}
                        innerRef={kickButtonRef}
                        label={t('ServerSettingsDialog.MembersTab.item.kick.label')}
                        onLeftClick={handleKick}
                        onAnyClick={setId}
                    >
                        <Sprite
                            className={styles.icon}
                            sprite={ASSETS.IMAGES.SPRITE.DOORWAY_ICON}
                        />
                    </Button>

                    <Overlay.Tooltip
                        leaderElementRef={kickButtonRef}
                        preferredAlignment='top'
                    >
                        {t('ServerSettingsDialog.MembersTab.item.kick.tooltip')}
                    </Overlay.Tooltip>

                    <Button
                        className={styles.button}
                        tabIndex={tabIndex}
                        isLoading={banHelpers.isLoading}
                        innerRef={banButtonRef}
                        label={t('ServerSettingsDialog.MembersTab.item.ban.label')}
                        onLeftClick={handleBan}
                        onAnyClick={setId}
                    >
                        <Sprite
                            className={styles.icon}
                            sprite={ASSETS.IMAGES.SPRITE.CROSS_ICON}
                        />
                    </Button>

                    <Overlay.Tooltip
                        leaderElementRef={banButtonRef}
                        preferredAlignment='top'
                    >
                        {t('ServerSettingsDialog.MembersTab.item.ban.tooltip')}
                    </Overlay.Tooltip>
                </div>
            </If>
        </li>
    );
};