import { FC } from 'react';
import { Button, MobileMenu, Sprite } from '@/components';
import { createStyles } from '@/utils';
import { useTrans } from '@/hooks';
import { ASSETS } from '@/generated/ASSETS';



const styles = createStyles({
    button: 'aspect-square h-full shrink-0 p-2.5',
    icon: 'stroke-white-black',
});

export const MobileMenuButton: FC = () => {
    const {
        openMenu,
        shouldShowContent,
        isDesktop,
    } = MobileMenu.useMobileMenu();
    const { t } = useTrans();

    if (isDesktop) return null;

    return (
        <Button
            className={styles.button}
            isActive={shouldShowContent}
            label={t('TopBar.MobileMenuButton.label')}
            onLeftClick={openMenu}
        >
            <Sprite
                className={styles.icon}
                sprite={ASSETS.IMAGES.SPRITE.BURGER_BARS}
            />
        </Button>
    );
};