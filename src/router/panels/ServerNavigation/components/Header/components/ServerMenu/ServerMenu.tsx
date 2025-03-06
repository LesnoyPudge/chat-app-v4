import { ActionMenu, Button, Overlay, Sprite } from '@/components';
import { ASSETS } from '@/generated/ASSETS';
import { useTrans } from '@/hooks';
import { withDisplayName } from '@lesnoypudge/utils-react';
import { cn, withDisplayNameAndDecorator } from '@/utils';



const {
    withDecorator,
} = withDisplayNameAndDecorator<Overlay.Menu.Types.PublicProps>(
    'ServerMenu',
    ({
        children,
        controls,
        leaderElementOrRectRef,
    }) => {
        const { t } = useTrans();

        return (
            <Overlay.Menu.Provider
                label={t('ServerMenu.label')}
                controls={controls}
                preferredAlignment='right'
                leaderElementOrRectRef={leaderElementOrRectRef}
                centered
            >
                <Overlay.Menu.Wrapper>
                    {children}
                </Overlay.Menu.Wrapper>
            </Overlay.Menu.Provider>
        );
    },
);

export const ServerMenu = withDisplayName(
    'ServerMenu',
    withDecorator(() => {
        const { t } = useTrans();
        const inviteFriendsControls = Overlay.useControls();
        const serverSettingsControls = Overlay.useControls();
        const leaveServerControls = Overlay.useControls();
        const deleteServerControls = Overlay.useControls();

        return (
            <ActionMenu.Wrapper>
                <>
                    <Button
                        className={ActionMenu.styles.button}
                        {...ActionMenu.buttonProps}
                        hasPopup='dialog'
                        isActive={inviteFriendsControls.isOpen}
                        label={t('ServerMenu.inviteFriends')}
                        onLeftClick={inviteFriendsControls.open}
                    >
                        <span>
                            {t('ServerMenu.inviteFriends')}
                        </span>

                        <Sprite
                            className={cn(
                                ActionMenu.styles.icon.size,
                                ActionMenu.styles.icon.baseFill,
                                ActionMenu.styles.icon.fill,
                            )}
                            sprite={ASSETS.IMAGES.SPRITE.FRIEND_ICON}
                        />
                    </Button>

                    {/* <InviteToChannelDialog/> */}
                </>

                <>
                    <Button
                        className={ActionMenu.styles.button}
                        {...ActionMenu.buttonProps}
                        hasPopup='dialog'
                        isActive={serverSettingsControls.isOpen}
                        label={t('ServerMenu.settings')}
                        onLeftClick={serverSettingsControls.open}
                    >
                        <span>
                            {t('ServerMenu.settings')}
                        </span>

                        <Sprite
                            className={cn(
                                ActionMenu.styles.icon.size,
                                ActionMenu.styles.icon.baseFill,
                                ActionMenu.styles.icon.fill,
                            )}
                            sprite={ASSETS.IMAGES.SPRITE.SETTINGS_GEAR}
                        />
                    </Button>

                    {/* <ChannelSettingsDialog/> */}
                </>

                <>
                    <Button
                        className={ActionMenu.styles.button}
                        {...ActionMenu.buttonProps}
                        hasPopup='dialog'
                        isActive={leaveServerControls.isOpen}
                        label={t('ServerMenu.leave')}
                        onLeftClick={leaveServerControls.open}
                    >
                        <span>
                            {t('ServerMenu.leave')}
                        </span>

                        <Sprite
                            className={cn(
                                ActionMenu.styles.icon.size,
                                ActionMenu.styles.icon.baseFill,
                                ActionMenu.styles.icon.fill,
                            )}
                            sprite={ASSETS.IMAGES.SPRITE.DOORWAY_ICON}
                        />
                    </Button>

                    {/* <LeaveChannelDialog/> */}
                </>

                <>
                    <Button
                        className={ActionMenu.styles.button}
                        {...ActionMenu.buttonProps}
                        hasPopup='dialog'
                        isActive={deleteServerControls.isOpen}
                        label={t('ServerMenu.delete')}
                        onLeftClick={deleteServerControls.open}
                    >
                        <span>
                            {t('ServerMenu.delete')}
                        </span>

                        <Sprite
                            className={cn(
                                ActionMenu.styles.icon.size,
                                ActionMenu.styles.icon.baseFill,
                                ActionMenu.styles.icon.fill,
                            )}
                            sprite={ASSETS.IMAGES.SPRITE.GARBAGE_CAN_ICON}
                        />
                    </Button>

                    {/* <DeleteChannelDialog/> */}
                </>
            </ActionMenu.Wrapper>
        );
    }),
);