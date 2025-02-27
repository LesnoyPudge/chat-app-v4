import { useValidatedParams, useTrans } from '@hooks';
import { cn, createStyles } from '@utils';
import { FC } from 'react';
import { ServerMenu } from './components';
import { useRefManager } from '@lesnoypudge/utils-react';
import { useSliceSelector } from '@redux/hooks';
import { Features } from '@redux/features';
import { Button, Overlay, Placeholder, Sprite } from '@components';
import { ASSETS } from '@generated/ASSETS';
import { WithTopBar } from '@router/layouts/bundled';



const styles = createStyles({
    topBar: {
        base: 'relative hover-focus-within:bg-primary-hover',
        active: 'bg-primary-hover',
    },
    button: 'flex h-full w-full items-center justify-between gap-4 px-4',
    buttonText: 'truncate font-semibold text-color-primary',
    buttonIcon: 'h-4 w-4 fill-icon-100',
});

export const Header: FC = () => {
    const { t } = useTrans();
    const buttonRef = useRefManager<HTMLButtonElement>(null);
    const { serverId } = useValidatedParams('server');
    const controls = Overlay.useControls();

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
        <WithTopBar className={cn(
            styles.topBar.base,
            controls.isOpen && styles.topBar.active,
        )}>
            <Button
                className={styles.button}
                label={t('ServerNavigation.Header.openMenuButtonLabel')}
                hasPopup='menu'
                isActive={controls.isOpen}
                innerRef={buttonRef}
                onLeftClick={controls.open}
            >
                <Placeholder.With reveal={!!server}>
                    <span className={styles.buttonText}>
                        {server?.name}
                    </span>
                </Placeholder.With>

                <Sprite
                    className={styles.buttonIcon}
                    sprite={sprite}
                />
            </Button>

            <ServerMenu
                leaderElementOrRectRef={buttonRef}
                controls={controls}
            />
        </WithTopBar>
    );
};