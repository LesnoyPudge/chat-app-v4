import { Button, Sprite, Tooltip } from '@components';
import { useRefManager } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { WrapperWithBullet } from '../WrapperWithBullet';
import { cn } from '@utils';
import { sharedStyles } from '../../sharedStyles';
import { useTrans } from '@i18n';
import { Modal } from '@entities';
import { CreateServerModal } from '@modals';



export const ActionButtons: FC = () => {
    const buttonRef = useRefManager<HTMLButtonElement>(null);
    const { t } = useTrans();
    const controls = Modal.useModalControls();

    return (
        <WrapperWithBullet isActive={controls.isOpen}>
            <Button
                className={cn(
                    sharedStyles.button.base,
                    sharedStyles.actionButton.base,
                    {
                        [sharedStyles.button.active]: controls.isOpen,
                        [sharedStyles.actionButton.active]: controls.isOpen,
                    },
                )}
                hasPopup='dialog'
                isActive={controls.isOpen}
                label={t('PrimaryNavigation.CreateServer.text')}
                innerRef={buttonRef}
                onLeftClick={controls.open}
            >
                <Sprite
                    className={sharedStyles.icon}
                    name='ADD_CHANNEL_NAVIGATION_ICON'
                />
            </Button>

            <CreateServerModal controls={controls}/>

            <Tooltip
                preferredAlignment='right'
                leaderElementRef={buttonRef}
            >
                {t('PrimaryNavigation.CreateServer.text')}
            </Tooltip>
        </WrapperWithBullet>
    );
};