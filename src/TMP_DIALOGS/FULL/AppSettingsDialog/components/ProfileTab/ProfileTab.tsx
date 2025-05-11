import { FC } from 'react';
import { SettingsDescription, SettingsGroupTitle } from '..';
import { AppSettingsDialogTabs } from '../../AppSettingsDialog';
import { Heading } from '@lesnoypudge/utils-react';
import { Button, DialogBlocks, Overlay, Separator } from '@/components';
import { useTrans } from '@/hooks';
import { ProfileManager, DeleteAccountDialog } from './components';



export const ProfileTab: FC = () => {
    const { t } = useTrans();
    const controls = Overlay.useControls();

    return (
        <Heading.Provider>
            <AppSettingsDialogTabs.Panel.ProfileTab>
                <DialogBlocks.FullScreen.TabTitle>
                    {t('AppSettingsDialog.Navigation.profileTab.title')}
                </DialogBlocks.FullScreen.TabTitle>

                <ProfileManager/>

                <Separator spacing={40} thickness={2} length='100%'/>

                <Heading.Provider>
                    <SettingsGroupTitle className='mb-2'>
                        {t('AppSettingsDialog.Navigation.profileTab.groupTitle')}
                    </SettingsGroupTitle>

                    <SettingsDescription className='mb-4'>
                        {t('AppSettingsDialog.Navigation.profileTab.description')}
                    </SettingsDescription>

                    <Button
                        stylingPreset='brandDanger'
                        hasPopup='dialog'
                        isActive={controls.isOpen}
                        onLeftClick={controls.open}
                    >
                        {t('AppSettingsDialog.Navigation.profileTab.deleteButton.text')}
                    </Button>

                    <DeleteAccountDialog controls={controls}/>
                </Heading.Provider>
            </AppSettingsDialogTabs.Panel.ProfileTab>
        </Heading.Provider>
    );
};