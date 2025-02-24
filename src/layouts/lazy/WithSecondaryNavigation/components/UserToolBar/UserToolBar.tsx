import { createStyles } from '@utils';
import { FC } from 'react';
import { UserInfo } from './components';
import { useSliceActions, useSliceSelector } from '@redux/hooks';
import { Features } from '@redux/features';
import { useFunction, useRefManager } from '@lesnoypudge/utils-react';
import { useTrans } from '@i18n';
import { Button, Sprite, Tooltip, Overlay } from '@components';
import { AppSettingsModal } from '@modals';
import { ASSETS } from '@generated/ASSETS';



const styles = createStyles({
    wrapper: `
        mt-auto 
        flex 
        h-[52px] 
        shrink-0 
        items-center 
        gap-2 
        bg-primary-400 
        px-2
        py-0
    `,
    buttonsWrapper: 'flex shrink-0',
    button: `
        flex 
        h-8 
        w-8 
        shrink-0 
        rounded 
        fill-icon-300 
        hover-focus-visible:bg-primary-hover
        hover-focus-visible:fill-icon-200
    `,
    icon: 'm-auto h-5 w-5',
});

export const UserToolBar: FC = () => {
    const { t } = useTrans();
    const microphoneButtonRef = useRefManager<HTMLButtonElement>(null);
    const headphoneButtonRef = useRefManager<HTMLButtonElement>(null);
    const settingsButtonRef = useRefManager<HTMLButtonElement>(null);
    const modalControls = Overlay.useOverlayControls();

    const {
        isDeaf,
        isMute,
    } = useSliceSelector(
        Features.App.Slice,
        ({ isDeaf, isMute }) => ({ isDeaf, isMute }),
    );

    const {
        setIsDeaf,
        setIsMute,
    } = useSliceActions(Features.App.Slice);

    const toggleMute = useFunction(() => setIsMute(!isMute));
    const toggleDeaf = useFunction(() => setIsDeaf(!isDeaf));

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
        <div className={styles.wrapper}>
            <UserInfo/>

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

                    <Tooltip
                        preferredAlignment='top'
                        leaderElementRef={microphoneButtonRef}
                    >
                        {microphoneLabel}
                    </Tooltip>
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

                    <Tooltip
                        preferredAlignment='top'
                        leaderElementRef={headphoneButtonRef}
                    >
                        {headphoneLabel}
                    </Tooltip>
                </>

                <>
                    <Button
                        className={styles.button}
                        label='Открыть настройки'
                        hasPopup='dialog'
                        isActive={modalControls.isOpen}
                        innerRef={settingsButtonRef}
                        onLeftClick={modalControls.open}
                    >
                        <Sprite
                            className={styles.icon}
                            sprite={ASSETS.IMAGES.SPRITE.SETTINGS_GEAR}
                        />
                    </Button>

                    <Tooltip
                        preferredAlignment='top'
                        leaderElementRef={settingsButtonRef}
                    >
                        {t('COMMON.Settings')}
                    </Tooltip>

                    <AppSettingsModal controls={modalControls}/>
                </>
            </div>
        </div>
    );
};