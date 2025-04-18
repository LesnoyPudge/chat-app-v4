import { Button, Sprite, Overlay } from '@/components';
import { useRefManager } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { WrapperWithBullet } from '../WrapperWithBullet';
import { cn } from '@/utils';
import { sharedStyles } from '../../sharedStyles';
import { useTrans } from '@/hooks';
import { ASSETS } from '@/generated/ASSETS';
import { CreateServerDialog } from './components';



export const ActionButtons: FC = () => {
    const buttonRef = useRefManager<HTMLButtonElement>(null);
    const { t } = useTrans();
    const controls = Overlay.useControls();

    return (
        <WrapperWithBullet isActive={controls.isOpen}>
            <Button
                className={cn(
                    sharedStyles.button,
                    sharedStyles.actionButton,
                )}
                hasPopup='dialog'
                isActive={controls.isOpen}
                label={t('PrimaryNavigation.CreateServer.text')}
                innerRef={buttonRef}
                onLeftClick={controls.open}
            >
                <Sprite
                    className={sharedStyles.icon}
                    sprite={ASSETS.IMAGES.SPRITE.ADD_CHANNEL_NAVIGATION_ICON}
                />
            </Button>

            <CreateServerDialog controls={controls}/>

            <Overlay.Tooltip
                preferredAlignment='right'
                leaderElementRef={buttonRef}
            >
                {t('PrimaryNavigation.CreateServer.text')}
            </Overlay.Tooltip>
        </WrapperWithBullet>
    );
};