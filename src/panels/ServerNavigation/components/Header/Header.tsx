import { useValidatedParams } from '@hooks';
import { cn } from '@utils';
import { FC } from 'react';
import { ChannelMenu } from './components';
import { useRefManager } from '@lesnoypudge/utils-react';
import { useSliceSelector } from '@redux/hooks';
import { Features } from '@redux/features';
import { Overlay, Sprite } from '@components';
import { ASSETS } from '@generated/ASSETS';



const styles = {
    topBar: {
        base: 'relative hover:bg-primary-hover focus-within:bg-primary-hover',
        active: 'bg-primary-hover',
    },
    button: 'flex justify-between items-center w-full h-full px-4',
    buttonText: 'font-semibold text-color-primary truncate',
    buttonIcon: 'w-4 h-4 fill-icon-100',
};

export const Header: FC = () => {
    const buttonRef = useRefManager<HTMLButtonElement>(null);
    const { serverId } = useValidatedParams('server');
    const controls = Overlay.useOverlayControls();

    const server = useSliceSelector(
        Features.Servers.Slice,
        Features.Servers.Slice.selectors.selectById(serverId),
    );

    const sprite = (
        controls.isOpen
            ? ASSETS.IMAGES.SPRITE.CROSS_ICON
            : ASSETS.IMAGES.SPRITE.DROPDOWN_ARROW_ICON
    );

    return (
        <OverlayContextProvider disabled={!channel}>
            {({ openOverlay, isOverlayExist }) => {
                return (
                    <TopBar className={cn(
                        styles.topBar.base,
                        { [styles.topBar.active]: isOverlayExist },
                    )}>
                        <Button
                            className={styles.button}
                            label='Открыть меню канала'
                            hasPopup='menu'
                            isActive={isOverlayExist}
                            innerRef={buttonRef}
                            onLeftClick={openOverlay}
                        >
                            <span className={styles.buttonText}>
                                {getTextFallback(channel?.name)}
                            </span>

                            <Sprite
                                className={styles.buttonIcon}
                                sprite={sprite}
                            />
                        </Button>

                        <EntityContextHelpers.Channel.Loaded>
                            <ChannelMenu leaderElementRef={ref}/>
                        </EntityContextHelpers.Channel.Loaded>
                    </TopBar>
                );
            }}
        </OverlayContextProvider>
    );
};