import { Button, KeyboardNavigation, Overlay, Placeholder, Sprite, WithPermission } from '@/components';
import { Navigator, Store } from '@/features';
import { ASSETS } from '@/generated/ASSETS';
import { useValidatedParams, useTrans } from '@/hooks';
import { useFunction, useRefManager, withDisplayName } from '@lesnoypudge/utils-react';
import { cn, createStyles } from '@/utils';
import { FC, memo, useRef } from 'react';
import { decorate } from '@lesnoypudge/macro';



const styles = createStyles({
    item: {
        size: 'h-9',
        base: `
            group/item 
            relative 
            flex 
            items-center 
            gap-1.5 
            rounded-md 
            p-1.5 
            font-medium
            text-color-muted
            hover-focus-within:bg-primary-hover 
            hover-focus-within:text-color-primary
        `,
        selected: 'bg-primary-selected text-color-primary',
    },
    navigationButton: 'absolute inset-0',
    channelTypeIcon: 'size-5 fill-icon-300',
    name: 'truncate',
    actionButton: {
        base: `
            group/action 
            z-0 
            ml-auto 
            h-9
            w-0 
            shrink-0
            opacity-0 
            group-hover-focus-within/item:w-9 
            group-hover-focus-within/item:opacity-100
        `,
        selected: 'w-9 opacity-100',
    },
    actionIcon: `
        m-auto
        size-4 
        fill-icon-300 
        group-hover-focus-visible/action:fill-icon-100 
    `,
});

export namespace ChannelItem {
    export type Props = {
        channelId: string;
    };
}

decorate(withDisplayName, 'ChannelItem', decorate.target);
decorate(memo, decorate.target);

export const ChannelItem: FC<ChannelItem.Props> = ({
    channelId,
}) => {
    const elementRef = useRef<HTMLLIElement>(null);
    const {
        isFocused,
        setFocusId,
        tabIndex,
    } = KeyboardNavigation.useCommonItem({
        elementRef,
        itemId: channelId,
    });
    const { navigateTo } = Navigator.useNavigateTo();
    const { serverId } = useValidatedParams('server');
    const isInChannel = Navigator.useIsLocation((v) => {
        return v.channel({ serverId, channelId });
    });
    const controls = Overlay.useControls();
    const settingsButtonRef = useRefManager<HTMLButtonElement>(null);
    const { t } = useTrans();

    const channel = Store.useSelector(
        Store.Channels.Selectors.selectById(channelId),
    );

    const handleNavigation = useFunction(() => {
        navigateTo.channel({ serverId, channelId });
    });

    const isTextChannel = channel?.voiceChat === null;
    const channelTypeSprite = (
        isTextChannel
            ? ASSETS.IMAGES.SPRITE.TEXT_ROOM_ICON
            : ASSETS.IMAGES.SPRITE.VOICE_ROOM_ICON
    );

    return (
        <Placeholder.With
            className={styles.item.size}
            reveal={!!channel}
        >
            <li
                className={cn(
                    styles.item.size,
                    styles.item.base,
                    isInChannel && styles.item.selected,
                )}
                ref={elementRef}
            >
                <Button
                    className={styles.navigationButton}
                    label={t('ServerNavigation.ChannelList.Item.navigationLabel', {
                        name: channel?.name,
                    })}
                    tabIndex={tabIndex}
                    isActive={isFocused}
                    onLeftClick={handleNavigation}
                    onAnyClick={setFocusId}
                >
                </Button>

                <Sprite
                    className={styles.channelTypeIcon}
                    sprite={channelTypeSprite}
                />

                <span className={styles.name}>
                    {channel?.name}
                </span>

                <WithPermission.ChannelControl serverId={serverId}>
                    <Button
                        className={cn(
                            styles.actionButton.base,
                            isInChannel && styles.actionButton.selected,
                        )}
                        tabIndex={tabIndex}
                        isActive={controls.isOpen}
                        hasPopup='dialog'
                        label={t('ServerNavigation.ChannelList.Item.settingsLabel', {
                            name: channel?.name,
                        })}
                        innerRef={settingsButtonRef}
                        onLeftClick={controls.open}
                        onAnyClick={setFocusId}
                    >
                        <Sprite
                            className={styles.actionIcon}
                            sprite={ASSETS.IMAGES.SPRITE.SETTINGS_GEAR}
                        />
                    </Button>

                    {/* <ChannelSettingsDialog/> */}

                    <Overlay.Tooltip
                        preferredAlignment='right'
                        spacing={5}
                        leaderElementRef={settingsButtonRef}
                    >
                        {t('ServerNavigation.ChannelList.Item.settingsTooltip')}
                    </Overlay.Tooltip>
                </WithPermission.ChannelControl>
            </li>
        </Placeholder.With>
    );
};