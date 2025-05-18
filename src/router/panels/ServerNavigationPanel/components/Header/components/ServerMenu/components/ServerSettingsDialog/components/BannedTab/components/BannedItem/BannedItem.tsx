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

decorate(withDisplayName, 'BannedItem', decorate.target);
decorate(memo, decorate.target);

export const BannedItem: FC<Props> = ({
    userId,
}) => {
    const { t } = useTrans();
    const { serverId } = useServerSettingsDialogContextProxy();
    const elementRef = useRefManager<HTMLLIElement>(null);
    const unBanButtonRef = useRefManager<HTMLButtonElement>(null);

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
        unBanTrigger,
        unBanHelpers,
    ] = Store.Servers.Api.useServerUnBanMemberMutation();

    const handleUnBan = useFunction(() => {
        void unBanTrigger({ serverId, targetId: userId });
    });

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

            <div className={styles.buttonsWrapper}>
                <Button
                    className={styles.button}
                    tabIndex={tabIndex}
                    isLoading={unBanHelpers.isLoading}
                    innerRef={unBanButtonRef}
                    label={t('ServerSettingsDialog.BannedTab.item.unBan.label')}
                    onLeftClick={handleUnBan}
                    onAnyClick={setId}
                >
                    <Sprite
                        className={styles.icon}
                        sprite={ASSETS.IMAGES.SPRITE.CROSS_ICON}
                    />
                </Button>

                <Overlay.Tooltip
                    leaderElementRef={unBanButtonRef}
                    preferredAlignment='top'
                >
                    {t('ServerSettingsDialog.BannedTab.item.unBan.tooltip')}
                </Overlay.Tooltip>
            </div>
        </li>
    );
};