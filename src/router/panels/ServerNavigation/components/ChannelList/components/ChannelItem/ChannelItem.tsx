import { Button, ListVariants, Overlay, Placeholder, Sprite, WithPermission } from '@/components';
import { Navigator } from '@/features';
import { ASSETS } from '@/generated/ASSETS';
import { useValidatedParams, useTrans } from '@/hooks';
import { useFunction, useRefManager } from '@lesnoypudge/utils-react';
import { Features } from '@/redux/features';
import { useSliceSelector } from '@/redux/hooks';
import { cn, createStyles } from '@/utils';
import { FC } from 'react';



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
    export type Props = (
        ListVariants.Variant1.Types.ChildrenProps<string>
    );
}

export const ChannelItem: FC<ChannelItem.Props> = ({
    id,
    itemRef,
    setFocusId,
    tabIndex,
}) => {
    const channelId = id;

    const { navigateTo, myLocationIs } = Navigator.useNavigator();
    const { serverId } = useValidatedParams('server');
    const controls = Overlay.useControls();
    const settingsButtonRef = useRefManager<HTMLButtonElement>(null);
    const { t } = useTrans();

    const channel = useSliceSelector(
        Features.Channels.Slice,
        Features.Channels.Slice.selectors.selectById(channelId),
    );

    const handleNavigation = useFunction(() => {
        void navigateTo.channel({ serverId, channelId });
    });

    const isInChannel = myLocationIs.channel({ serverId, channelId });

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
                ref={itemRef}
            >
                <Button
                    className={styles.navigationButton}
                    label={t('ServerNavigation.ChannelList.Item.navigationLabel', {
                        name: channel?.name,
                    })}
                    tabIndex={tabIndex}
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