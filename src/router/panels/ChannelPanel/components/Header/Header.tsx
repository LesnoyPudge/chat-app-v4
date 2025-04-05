import { Button, Overlay, Placeholder, Sprite } from '@/components';
import { Navigator, Store } from '@/features';
import { ASSETS } from '@/generated/ASSETS';
import { useTrans } from '@/hooks';
import { TopBar } from '@/router/layouts/bundled';
import { ChatPageTemplate } from '@/router/templates';
import { createStyles } from '@/utils';
import { Heading, Hidden, useRefManager } from '@lesnoypudge/utils-react';
import { FC } from 'react';



const styles = createStyles({
    wrapper: 'gap-1.5 px-4',
    icon: 'size-5 fill-icon-300',
    heading: 'truncate font-bold text-color-primary',
    toggleButton: `
        ml-auto
        size-8 
        fill-icon-300 
        hover-focus-visible:fill-icon-100
    `,
    toggleIcon: 'm-auto size-6',
});

export const Header: FC = () => {
    const {
        toggle,
        shouldShowExtraPanel,
    } = ChatPageTemplate.useChatPageTemplate();
    const { channelId } = Navigator.useParams('channel');
    const { t } = useTrans();
    const toggleButtonRef = useRefManager<HTMLButtonElement>(null);

    const isTextChannel = Store.useSelector(
        Store.Channels.Selectors.selectIsTextChannelById(channelId),
    );

    const name = Store.useSelector(
        Store.Channels.Selectors.selectNameById(channelId),
    );

    const sprite = (
        isTextChannel
            ? ASSETS.IMAGES.SPRITE.TEXT_ROOM_ICON
            : ASSETS.IMAGES.SPRITE.VOICE_ROOM_ICON
    );

    const toggleButtonDescription = (
        shouldShowExtraPanel
            ? t('ChannelPanel.Header.toggleButton.description.off')
            : t('ChannelPanel.Header.toggleButton.description.on')
    );

    return (
        <TopBar
            className={styles.wrapper}
            withMobileButton
        >
            <Placeholder.With reveal={!!name}>
                <Sprite
                    className={styles.icon}
                    sprite={sprite}
                />

                <Heading.Node className={styles.heading}>
                    <Hidden.Visually>
                        {t('ChannelPanel.Header.heading', {
                            name,
                        })}
                    </Hidden.Visually>

                    <Hidden.Accessibly>
                        {name}
                    </Hidden.Accessibly>
                </Heading.Node>
            </Placeholder.With>

            <Button
                className={styles.toggleButton}
                label={toggleButtonDescription}
                innerRef={toggleButtonRef}
                isActive={shouldShowExtraPanel}
                onLeftClick={toggle}
            >
                <Sprite
                    className={styles.toggleIcon}
                    sprite={ASSETS.IMAGES.SPRITE.CHANNEL_MEMBERS_ICON}
                />
            </Button>

            <Overlay.Tooltip
                leaderElementRef={toggleButtonRef}
                preferredAlignment='bottom'
            >
                {toggleButtonDescription}
            </Overlay.Tooltip>
        </TopBar>
    );
};