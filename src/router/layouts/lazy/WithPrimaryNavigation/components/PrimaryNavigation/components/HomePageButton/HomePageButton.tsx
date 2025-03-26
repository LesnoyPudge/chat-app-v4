import { Button, Sprite, Overlay, MobileMenu } from '@/components';
import { useTrans } from '@/hooks';
import { useFunction, useRefManager } from '@lesnoypudge/utils-react';
import { cn } from '@/utils';
import { FC } from 'react';
import { WrapperWithBullet } from '../WrapperWithBullet';
import { sharedStyles } from '../../sharedStyles';
import { Navigator } from '@/features';
import { ASSETS } from '@/generated/ASSETS';



export const HomePageButton: FC = () => {
    const buttonRef = useRefManager<HTMLButtonElement>(null);
    const { t } = useTrans();
    const { navigateTo } = Navigator.useNavigateTo();
    const { closeMenu } = MobileMenu.useMobileMenu();
    const isInRoot = Navigator.useIsLocation((v) => v.root());
    const isInAnyConversation = Navigator.useIsLocation((v) => {
        return v.anyConversation();
    });

    const handleClick = useFunction(() => {
        navigateTo.root();
        if (isInRoot) closeMenu();
    });

    const isInRootOrConversation = isInRoot || isInAnyConversation;

    return (
        <WrapperWithBullet isActive={isInRootOrConversation}>
            <Button
                className={cn(
                    sharedStyles.button,
                    sharedStyles.brandButton,
                )}
                innerRef={buttonRef}
                isActive={isInRootOrConversation}
                label={t('PrimaryNavigation.HomePageButton.label')}
                onLeftClick={handleClick}
            >
                <Sprite
                    className={sharedStyles.icon}
                    sprite={ASSETS.IMAGES.SPRITE.DISCORD_LOGO}
                />
            </Button>

            <Overlay.Tooltip
                preferredAlignment='right'
                leaderElementRef={buttonRef}
            >
                {t('PrimaryNavigation.HomePageButton.text')}
            </Overlay.Tooltip>
        </WrapperWithBullet>
    );
};