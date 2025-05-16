import { useTrans } from '@/hooks';
import { createStyles } from '@/utils';
import { FC } from 'react';
import { ChannelSettingsDialogTabs } from '../../ChannelSettingsDialog';
import { DialogBlocks, Overlay, Separator, Sprite } from '@/components';
import { ASSETS } from '@/generated/ASSETS';
import { DeleteChannelDialog } from './components';
import { Store } from '@/features';



const styles = createStyles({
    deleteIcon: 'size-4',
});

type Props = {
    channelId: string;
};

export const Navigation: FC<Props> = ({ channelId }) => {
    const { t } = useTrans();
    const deleteChannelControls = Overlay.useControls();

    const channelName = Store.useSelector(
        Store.Channels.Selectors.selectNameById(channelId),
    );

    return (
        <>
            <ChannelSettingsDialogTabs.List>
                <DialogBlocks.FullScreen.NavigationHeading>
                    {t('ChannelSettingsDialog.Navigation.overviewTab.label', {
                        channelName,
                    })}
                </DialogBlocks.FullScreen.NavigationHeading>

                <ChannelSettingsDialogTabs.Item.OverviewTab>
                    {(tabProps) => (
                        <DialogBlocks.FullScreen.NavigationButton
                            {...tabProps}
                            label={t('ChannelSettingsDialog.Navigation.overviewTab.button.label')}
                        >
                            {t('ChannelSettingsDialog.Navigation.overviewTab.button.label')}
                        </DialogBlocks.FullScreen.NavigationButton>
                    )}
                </ChannelSettingsDialogTabs.Item.OverviewTab>
            </ChannelSettingsDialogTabs.List>

            <Separator spacing={16} thickness={2} length='100%'/>

            <DialogBlocks.FullScreen.NavigationButton
                onLeftClick={deleteChannelControls.open}
                isActive={deleteChannelControls.isOpen}
                hasPopup='dialog'
            >
                <span>
                    {t('ChannelSettingsDialog.Navigation.deleteButton.text')}
                </span>

                <Sprite
                    className={styles.deleteIcon}
                    sprite={ASSETS.IMAGES.SPRITE.GARBAGE_CAN_ICON}
                />
            </DialogBlocks.FullScreen.NavigationButton>

            <DeleteChannelDialog
                controls={deleteChannelControls}
                channelId={channelId}
            />
        </>
    );
};