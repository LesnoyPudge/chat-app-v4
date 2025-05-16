import { DialogBlocks, Form, Inputs } from '@/components';
import {
    ChannelSettingsDialogTabs,
    ChannelSettingsForm,
} from '../../ChannelSettingsDialog';
import { FC } from 'react';
import { useTrans } from '@/hooks';



export const OverviewTab: FC = () => {
    const { t } = useTrans();

    return (
        <ChannelSettingsDialogTabs.Panel.OverviewTab>
            <DialogBlocks.FullScreen.TabTitle>
                {t('ChannelSettingsDialog.OverviewTab.title')}
            </DialogBlocks.FullScreen.TabTitle>

            <Inputs.TextInput.Provider
                label={t('ChannelSettingsDialog.OverviewTab.nameField.label')}
                name={ChannelSettingsForm.names.name}
            >
                <Form.Label>
                    {t('ChannelSettingsDialog.OverviewTab.nameField.label')}
                </Form.Label>

                <Inputs.TextInput.Wrapper>
                    <Inputs.TextInput.Node/>
                </Inputs.TextInput.Wrapper>
            </Inputs.TextInput.Provider>
        </ChannelSettingsDialogTabs.Panel.OverviewTab>
    );
};