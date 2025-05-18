import {
    ServerSettingsDialogTabs,
    ServerSettingsForm,
} from '../../ServerSettingsDialog';
import { FC } from 'react';
import { useTrans } from '@/hooks';
import { DialogBlocks, Form, Inputs, Separator } from '@/components';
import { AvatarUploader } from './components';



export const OverviewTab: FC = () => {
    const { t } = useTrans();

    return (
        <ServerSettingsDialogTabs.Panel.OverviewTab>
            <DialogBlocks.FullScreen.TabTitle>
                {t('ServerSettingsDialog.OverviewTab.title')}
            </DialogBlocks.FullScreen.TabTitle>

            <AvatarUploader/>

            <Separator spacing={40} thickness={2} length='100%'/>

            <Inputs.TextInput.Provider
                label={t('ServerSettingsDialog.OverviewTab.nameField.label')}
                name={ServerSettingsForm.names.name}
            >
                <Form.Label>
                    {t('ServerSettingsDialog.OverviewTab.nameField.label')}
                </Form.Label>

                <Inputs.TextInput.Wrapper>
                    <Inputs.TextInput.Node/>
                </Inputs.TextInput.Wrapper>
            </Inputs.TextInput.Provider>
        </ServerSettingsDialogTabs.Panel.OverviewTab>
    );
};