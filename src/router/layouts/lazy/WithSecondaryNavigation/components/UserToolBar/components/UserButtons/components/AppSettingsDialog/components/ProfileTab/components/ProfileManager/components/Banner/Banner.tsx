import { createStyles } from '@/utils';
import { FC } from 'react';
import { AppSettingsDialogForm } from '../../../../../../AppSettingsDialog';
import {
    Button,
    Inputs,
    Overlay,
    RelativelyPositioned,
    Sprite,
} from '@/components';
import { useTrans } from '@/hooks';
import { useRefManager } from '@lesnoypudge/utils-react';
import { ASSETS } from '@/generated/ASSETS';
import { ColoredWrapper } from './components';
import { useMotionValue } from 'motion/react';
import { AnimationPresets } from '@/entities';



const styles = createStyles({
    banner: `
        flex 
        h-[100px] 
        w-full 
        items-start 
        justify-end 
        rounded-t-lg 
        p-4
    `,
    bannerButton: `
        flex 
        size-10 
        rounded-full 
        bg-primary-300 
        fill-icon-200 
        data-[active=true]:fill-icon-100
        hover-focus-visible:fill-icon-100
    `,
    bannerIcon: 'm-auto size-4 transition-none',
});

const initialBannerColor = '#a90d0e';

const colorPresets = [
    initialBannerColor,
    '#e3722c',
    '#5b0da9',
    '#0da9a9',
    '#5ba90d',
];

export const Banner: FC = () => {
    const { t } = useTrans();
    const controls = Overlay.useControls();
    const buttonRef = useRefManager<HTMLButtonElement>(null);
    const progress = useMotionValue(2);
    const { onEnter, onExit, style } = AnimationPresets.useFade({
        progress,
    });

    return (
        <ColoredWrapper className={styles.banner}>
            <Button
                className={styles.bannerButton}
                isActive={controls.isOpen}
                label={t('AppSettingsDialog.ProfileTab.bannerColor.label')}
                hasPopup='dialog'
                innerRef={buttonRef}
                onLeftClick={controls.open}
            >
                <Sprite
                    className={styles.bannerIcon}
                    sprite={ASSETS.IMAGES.SPRITE.DROPPER_ICON}
                />
            </Button>

            <Overlay.Dialog.Provider
                controls={controls}
                label={t('AppSettingsDialog.ProfileTab.bannerColor.label')}
                progress={progress}
                dialogStyle={style}
                onEnter={onEnter}
                onExit={onExit}
            >
                <Overlay.Dialog.Wrapper>
                    <RelativelyPositioned.Node
                        leaderElementOrRectRef={buttonRef}
                        preferredAlignment='left'
                        spacing={10}
                    >
                        <Inputs.ColorPicker.Provider
                            label={t('AppSettingsDialog.ProfileTab.bannerColor.label')}
                            name={AppSettingsDialogForm.names.bannerColor}
                            colorPresets={colorPresets}
                        >
                            <Inputs.ColorPicker.Node/>
                        </Inputs.ColorPicker.Provider>
                    </RelativelyPositioned.Node>
                </Overlay.Dialog.Wrapper>
            </Overlay.Dialog.Provider>

            <Overlay.Tooltip
                preferredAlignment='top'
                leaderElementRef={buttonRef}
            >
                {t('AppSettingsDialog.ProfileTab.bannerColor.label')}
            </Overlay.Tooltip>
        </ColoredWrapper>
    );
};