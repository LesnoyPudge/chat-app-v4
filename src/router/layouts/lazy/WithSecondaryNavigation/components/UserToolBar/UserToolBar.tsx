import { createStyles } from '@/utils';
import { FC } from 'react';
import { UserInfo } from './components';
import { useFunction, useRefManager } from '@lesnoypudge/utils-react';
import { useTrans } from '@/hooks';
import { Button, Sprite, Overlay } from '@/components';
import { ASSETS } from '@/generated/ASSETS';
import { Store } from '@/features';



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
    const controls = Overlay.useControls();

    const {
        isDeaf,
        isMute,
    } = Store.useSliceSelector(
        Store.App,
        ({ isDeaf, isMute }) => ({ isDeaf, isMute }),
    );

    const {
        setIsDeaf,
        setIsMute,
    } = Store.useActions(Store.App);

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
                        label='Открыть настройки'
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

                    {/* <AppSettingsDialog controls={controls}/> */}
                </>
            </div>
        </div>
    );
};