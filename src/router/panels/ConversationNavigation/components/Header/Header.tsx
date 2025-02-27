import { Button, Sprite } from '@components';
import { Navigator } from '@features';
import { ASSETS } from '@generated/ASSETS';
import { useTrans } from '@hooks';
import { WithTopBar } from '@router/layouts/bundled';
import { useFunction } from '@lesnoypudge/utils-react';
import { cn, createStyles } from '@utils';
import { FC } from 'react';



const styles = createStyles({
    button: {
        base: `
            group 
            flex 
            h-full 
            w-full 
            items-center
            px-3 
            font-medium
            hover-focus-visible:bg-primary-hover
        `,
        active: 'bg-primary-hover',
    },
    icon: {
        base: `
            mr-3 
            size-6 
            fill-icon-300 
            transition-none 
            group-hover-focus-visible:fill-icon-200
        `,
        active: 'fill-icon-200',
    },
});

export const Header: FC = () => {
    const { t } = useTrans();
    const { navigateTo, myLocationIs } = Navigator.useNavigator();

    const isActive = myLocationIs.root();

    const handleClick = useFunction(() => {
        void navigateTo.root();
    });

    return (
        <WithTopBar>
            <Button
                className={cn(
                    styles.button.base,
                    isActive && styles.button.active,
                )}
                isActive={isActive}
                onLeftClick={handleClick}
                label={t('ConversationNavigation.Header.navigationButton.label')}
            >
                <Sprite
                    className={cn(
                        styles.icon.base,
                        isActive && styles.icon.active,
                    )}
                    sprite={ASSETS.IMAGES.SPRITE.FRIEND_ICON}
                />

                <span>
                    {t('ConversationNavigation.Header.title')}
                </span>
            </Button>
        </WithTopBar>
    );
};