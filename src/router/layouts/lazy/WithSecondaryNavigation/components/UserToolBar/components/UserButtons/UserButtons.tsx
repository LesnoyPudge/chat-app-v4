import { createStyles } from '@/utils';
import { FC } from 'react';
import { useFunction, useRefManager } from '@lesnoypudge/utils-react';
import { useTrans } from '@/hooks';
import { Button, Sprite, Overlay } from '@/components';
import { ASSETS } from '@/generated/ASSETS';
import { Store } from '@/features';
import { AppSettingsDialog } from './components';



const styles = createStyles({
    buttonsWrapper: 'flex shrink-0',
    button: `
        flex 
        size-8
        shrink-0 
        rounded 
        fill-icon-300 
        hover-focus-visible:bg-primary-hover
        hover-focus-visible:fill-icon-200
    `,
    icon: 'm-auto size-5',
});

export const UserButtons: FC = () => {
    const { t } = useTrans();
    const microphoneButtonRef = useRefManager<HTMLButtonElement>(null);
    const headphoneButtonRef = useRefManager<HTMLButtonElement>(null);
    const settingsButtonRef = useRefManager<HTMLButtonElement>(null);
    const controls = Overlay.useControls();

    const { isDeaf, isMute } = Store.useSliceSelector(
        Store.App,
        ({ isDeaf, isMute }) => ({ isDeaf, isMute }),
    );

    const { setIsDeaf, setIsMute } = Store.useActions(Store.App);

    const toggleMute = useFunction(() => {
        const shouldMute = !isMute;

        const sound = (
            shouldMute
                ? ASSETS.SOUNDS.DISCORD_MUTE
                : ASSETS.SOUNDS.DISCORD_UNMUTE
        );

        // soundManager.play(sound);

        setIsMute(shouldMute);
    });

    const toggleDeaf = useFunction(() => {
        const shouldDeaf = !isDeaf;

        const sound = (
            shouldDeaf
                ? ASSETS.SOUNDS.DISCORD_DEAFEN
                : ASSETS.SOUNDS.DISCORD_UNDEAFEN
        );

        // soundManager.play(sound);

        setIsDeaf(!isDeaf);
    });

    const microphoneSprite = (
        isMute
            ? ASSETS.IMAGES.SPRITE.MICROPHONE_MUTED
            : ASSETS.IMAGES.SPRITE.MICROPHONE
    );

    const headphoneSprite = (
        isDeaf
            ? ASSETS.IMAGES.SPRITE.HEADPHONE_MUTED
            : ASSETS.IMAGES.SPRITE.HEADPHONE
    );

    const microphoneLabel = (
        isMute
            ? t('MICROPHONE.ENABLE')
            : t('MICROPHONE.DISABLE')
    );

    const headphoneLabel = (
        isDeaf
            ? t('HEADPHONE.ENABLE')
            : t('HEADPHONE.DISABLE')
    );

    return (
        <div className={styles.buttonsWrapper}>
            <>
                <Button
                    className={styles.button}
                    label={microphoneLabel}
                    isActive={isMute}
                    innerRef={microphoneButtonRef}
                    onLeftClick={toggleMute}
                >
                    <Sprite
                        className={styles.icon}
                        sprite={microphoneSprite}
                    />
                </Button>

                <Overlay.Tooltip
                    preferredAlignment='top'
                    leaderElementRef={microphoneButtonRef}
                >
                    {microphoneLabel}
                </Overlay.Tooltip>
            </>

            <>
                <Button
                    className={styles.button}
                    label={headphoneLabel}
                    isActive={isDeaf}
                    innerRef={headphoneButtonRef}
                    onLeftClick={toggleDeaf}
                >
                    <Sprite
                        className={styles.icon}
                        sprite={headphoneSprite}
                    />
                </Button>

                <Overlay.Tooltip
                    preferredAlignment='top'
                    leaderElementRef={headphoneButtonRef}
                >
                    {headphoneLabel}
                </Overlay.Tooltip>
            </>

            <>
                <Button
                    className={styles.button}
                    label={t('AppSettingsDialog.openDialogButton.label')}
                    hasPopup='dialog'
                    isActive={controls.isOpen}
                    innerRef={settingsButtonRef}
                    onLeftClick={controls.open}
                >
                    <Sprite
                        className={styles.icon}
                        sprite={ASSETS.IMAGES.SPRITE.SETTINGS_GEAR}
                    />
                </Button>

                <Overlay.Tooltip
                    preferredAlignment='top'
                    leaderElementRef={settingsButtonRef}
                >
                    {t('COMMON.Settings')}
                </Overlay.Tooltip>

                <AppSettingsDialog controls={controls}/>
            </>
        </div>
    );
};