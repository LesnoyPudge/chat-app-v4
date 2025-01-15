import { Button, Sprite, Tooltip } from '@components';
import { Navigator } from '@entities';
import { useTrans } from '@i18n';
import { useFunction, useRefManager } from '@lesnoypudge/utils-react';
import { cn } from '@utils';
import { FC } from 'react';
import { WrapperWithBullet } from '../WrapperWithBullet';
import { sharedStyles } from '../../sharedStyles';



export const HomePageButton: FC = () => {
    const buttonRef = useRefManager<HTMLButtonElement>(null);
    const { t } = useTrans();
    const { navigateTo, myLocationIs } = Navigator.useNavigator();

    const handleClick = useFunction(() => {
        void navigateTo.root();
    });

    const isInRootOrConversation = (
        myLocationIs.root() || myLocationIs.anyConversation()
    );

    return (
        <WrapperWithBullet isActive={isInRootOrConversation}>
            <Button
                className={cn(
                    sharedStyles.button.base,
                    sharedStyles.brandButton.base,
                    isInRootOrConversation && sharedStyles.button.active,
                    isInRootOrConversation && sharedStyles.brandButton.active,
                )}
                innerRef={buttonRef}
                isActive={isInRootOrConversation}
                label={t('PrimaryNavigation.HomePageButton.label')}
                onLeftClick={handleClick}
            >
                <Sprite
                    className={sharedStyles.icon}
                    name='DISCORD_LOGO'
                />
            </Button>

            <Tooltip
                preferredAlignment='right'
                leaderElementRef={buttonRef}
            >
                {t('PrimaryNavigation.HomePageButton.text')}
            </Tooltip>
        </WrapperWithBullet>
    );
};