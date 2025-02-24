import { Button, Overlay, Sprite, Tooltip } from '@components';
import { ASSETS } from '@generated/ASSETS';
import { Heading, useRefManager } from '@lesnoypudge/utils-react';
import { createStyles } from '@utils';
import { FC } from 'react';



const styles = createStyles({
    wrapper: 'mt-4 flex justify-between gap-2 px-4',
    heading: 'font-semibold',
    button: 'size-8 fill-icon-300 hover-focus-visible:fill-icon-100',
    icon: 'm-auto size-4',
});

export const AddChannel: FC = () => {
    const controls = Overlay.useOverlayControls();
    const buttonRef = useRefManager<HTMLButtonElement>(null);

    return (
        <div className={styles.wrapper}>
            <Heading.Node className={styles.heading}>
                <>Комнаты</>
            </Heading.Node>

            <Button
                className={styles.button}
                hasPopup='dialog'
                label='Открыть диалог создания комнаты'
                isActive={controls.isOpen}
                innerRef={buttonRef}
                onLeftClick={controls.open}
            >
                <Sprite
                    className={styles.icon}
                    sprite={ASSETS.IMAGES.SPRITE.PLUS_ICON}
                />
            </Button>

            <Tooltip
                leaderElementRef={buttonRef}
                preferredAlignment='right'
            >
                <>Добавить комнату</>
            </Tooltip>

            {/* <CreateRoomModal/> */}
        </div>
    );
};