import { useTrans } from '@/hooks';
import { cn, createStyles } from '@/utils';
import { FC } from 'react';
import { ServerMenu } from './components';
import { useRefManager } from '@lesnoypudge/utils-react';
import { Button, Overlay, Placeholder, Sprite } from '@/components';
import { ASSETS } from '@/generated/ASSETS';
import { TopBar } from '@/router/layouts/bundled';
import { Navigator, Store } from '@/features';



const styles = createStyles({
    topBar: {
        base: 'relative hover-focus-within:bg-primary-hover',
        active: 'bg-primary-hover',
    },
    button: 'flex size-full items-center justify-between gap-4 px-4',
    buttonText: 'truncate font-semibold text-color-primary',
    buttonIcon: 'size-4 fill-icon-100',
});

export const Header: FC = () => {
    const { t } = useTrans();
    const buttonRef = useRefManager<HTMLButtonElement>(null);
    const { serverId } = Navigator.useParams('server');
    const controls = Overlay.useControls();

    const serverName = Store.useSelector(
        Store.Servers.Selectors.selectNameById(serverId),
    );

    const sprite = (
        controls.isOpen
            ? ASSETS.IMAGES.SPRITE.CROSS_ICON
            : ASSETS.IMAGES.SPRITE.DROPDOWN_ARROW_ICON
    );

    return (
        <TopBar className={cn(
            styles.topBar.base,
            controls.isOpen && styles.topBar.active,
        )}>
            <Button
                className={styles.button}
                label={t('ServerNavigation.Header.openMenuButtonLabel')}
                hasPopup='menu'
                isActive={controls.isOpen}
                innerRef={buttonRef}
                isDisabled={!serverName}
                onLeftClick={controls.open}
            >
                <Placeholder.With reveal={serverName}>
                    {(serverName) => (
                        <>
                            <span className={styles.buttonText}>
                                {serverName}
                            </span>

                            <Sprite
                                className={styles.buttonIcon}
                                sprite={sprite}
                            />
                        </>
                    )}
                </Placeholder.With>
            </Button>

            <ServerMenu
                leaderElementOrRectRef={buttonRef}
                controls={controls}
            />
        </TopBar>
    );
};