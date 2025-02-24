import { FC } from 'react';
import { Button, MobileMenu, Sprite } from '@components';
import { ContextSelectable } from '@lesnoypudge/utils-react';
import { createStyles } from '@utils';
import { useTrans } from '@i18n';
import { ASSETS } from '@generated/ASSETS';



const styles = createStyles({
    button: 'aspect-square h-full shrink-0 p-2.5',
    icon: 'stroke-white-black',
});

export const MobileMenuButton: FC = () => {
    const {
        openMenu,
        shouldShowContent,
        isDesktop,
    } = ContextSelectable.useProxy(MobileMenu.Context);
    const { t } = useTrans();

    if (isDesktop) return null;

    return (
        <Button
            className={styles.button}
            isActive={shouldShowContent}
            label={t('WithTopBar.MobileMenuButton.label')}
            onLeftClick={openMenu}
        >
            <Sprite
                className={styles.icon}
                sprite={ASSETS.IMAGES.SPRITE.BURGER_BARS}
            />
        </Button>
    );
};