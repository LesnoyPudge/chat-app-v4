import { Button, Overlay, RelativelyPositioned, Sprite } from '@components';
import { ASSETS } from '@generated/ASSETS';
import { useTrans } from '@hooks';
import { createWithDecorator, withDisplayName } from '@lesnoypudge/utils-react';
import { createStyles, getAnimationVariants } from '@utils';



const styles = createStyles({
    wrapper: `
        flex 
        w-full
        max-w-[220px] 
        flex-col 
        gap-1 
        rounded-md 
        bg-primary-500 
        px-2 
        py-1.5
    `,
    button: `
        flex 
        h-8 
        w-full 
        shrink-0 
        items-center 
        justify-between 
        gap-1 
        rounded
        fill-icon-300 
        px-2 
        py-1.5 
        text-start 
        text-color-secondary 
        hover-focus-visible:bg-brand
        hover-focus-visible:fill-white 
        hover-focus-visible:text-white 
    `,
    buttonText: 'truncate text-sm font-medium',
    buttonIcon: 'h-5 w-5 transition-none',
});

export namespace ServerMenu {
    export type DecoratorProps = (
        Overlay.Types.WithControls
        & Pick<
            RelativelyPositioned.Node.RequiredProps,
            'leaderElementOrRectRef'
        >
    );
}

const { animationVariants } = getAnimationVariants.withOpacity();

const { withDecorator } = createWithDecorator<ServerMenu.DecoratorProps>(({
    controls,
    leaderElementOrRectRef,
    children,
}) => {
    const { t } = useTrans();

    return (
        <Overlay.Dialog.Provider
            label={t('ServerMenu.label')}
            animationVariants={animationVariants}
            focused
            outerState={controls.isOpen}
            onChange={controls.onChange}
        >
            <Overlay.Dialog.Wrapper>
                <RelativelyPositioned.Node
                    leaderElementOrRectRef={leaderElementOrRectRef}
                    preferredAlignment='bottom'
                    spacing={10}
                    centered
                >
                    {children}
                </RelativelyPositioned.Node>
            </Overlay.Dialog.Wrapper>
        </Overlay.Dialog.Provider>
    );
});

export const ServerMenu = withDisplayName(
    'ServerMenu',
    withDecorator(() => {
        const { t } = useTrans();
        const inviteFriendsControls = Overlay.useControls();
        const serverSettingsControls = Overlay.useControls();
        const leaveServerControls = Overlay.useControls();
        const deleteServerControls = Overlay.useControls();

        return (
            <div
                className={styles.wrapper}
                role='menu'
                aria-label={t('ServerMenu.actionListLabel')}
            >
                <>
                    <Button
                        className={styles.button}
                        role='menuitem'
                        hasPopup='dialog'
                        isActive={inviteFriendsControls.isOpen}
                        label={t('ServerMenu.inviteFriends')}
                        onLeftClick={inviteFriendsControls.open}
                    >
                        <span className={styles.buttonText}>
                            {t('ServerMenu.inviteFriends')}
                        </span>

                        <Sprite
                            className={styles.buttonIcon}
                            sprite={ASSETS.IMAGES.SPRITE.FRIEND_ICON}
                        />
                    </Button>

                    {/* <InviteToChannelModal/> */}
                </>

                <>
                    <Button
                        className={styles.button}
                        role='menuitem'
                        hasPopup='dialog'
                        isActive={serverSettingsControls.isOpen}
                        label={t('ServerMenu.settings')}
                        onLeftClick={serverSettingsControls.open}
                    >
                        <span className={styles.buttonText}>
                            {t('ServerMenu.settings')}
                        </span>

                        <Sprite
                            className={styles.buttonIcon}
                            sprite={ASSETS.IMAGES.SPRITE.SETTINGS_GEAR}
                        />
                    </Button>

                    {/* <ChannelSettingsModal/> */}
                </>

                <>
                    <Button
                        className={styles.button}
                        role='menuitem'
                        hasPopup='dialog'
                        isActive={leaveServerControls.isOpen}
                        label={t('ServerMenu.leave')}
                        onLeftClick={leaveServerControls.open}
                    >
                        <span className={styles.buttonText}>
                            {t('ServerMenu.leave')}
                        </span>

                        <Sprite
                            className={styles.buttonIcon}
                            sprite={ASSETS.IMAGES.SPRITE.DOORWAY_ICON}
                        />
                    </Button>

                    {/* <LeaveChannelModal/> */}
                </>

                <>
                    <Button
                        className={styles.button}
                        role='menuitem'
                        hasPopup='dialog'
                        isActive={deleteServerControls.isOpen}
                        label={t('ServerMenu.delete')}
                        onLeftClick={deleteServerControls.open}
                    >
                        <span className={styles.buttonText}>
                            {t('ServerMenu.delete')}
                        </span>

                        <Sprite
                            className={styles.buttonIcon}
                            sprite={ASSETS.IMAGES.SPRITE.GARBAGE_CAN_ICON}
                        />
                    </Button>

                    {/* <DeleteChannelModal/> */}
                </>
            </div>
        );
    }),
);