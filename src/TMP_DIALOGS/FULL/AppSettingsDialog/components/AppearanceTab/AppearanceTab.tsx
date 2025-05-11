import { FC } from 'react';
import { ChatExample } from './components';
import {
    AppSettingsDialogForm,
    AppSettingsDialogTabs,
} from '../../AppSettingsDialog';
import { Heading } from '@lesnoypudge/utils-react';
import { DialogBlocks, Inputs, Separator } from '@/components';
import { SettingsGroupTitle } from '../SettingsGroupTitle';
import { createStyles } from '@/utils';
import { useTrans } from '@/hooks';
import { T } from '@lesnoypudge/types-utils-base/namespace';



const styles = createStyles({
    themeWrapper: 'mt-8',
    themeInputsWrapper: 'grid gap-2',
    displayModeInputsWrapper: 'grid gap-2',
    groupGapWrapper: 'mt-5',
});

const messageFontSizeRange = [12, 14, 16, 18, 20] as (
    T.UnionToTuple<AppSettingsDialogForm['messageFontSize']>
);

const messageGroupSpacingRange = [16, 20] as (
    T.UnionToTuple<AppSettingsDialogForm['messageGroupSpacing']>
);

export const AppearanceTab: FC = () => {
    const { t } = useTrans();

    return (
        <Heading.Provider>
            <AppSettingsDialogTabs.Panel.AppearanceTab>
                <DialogBlocks.FullScreen.TabTitle>
                    {t('AppSettingsDialog.AppearanceTab.title')}
                </DialogBlocks.FullScreen.TabTitle>

                <ChatExample/>

                <Heading.Provider>
                    <div className={styles.themeWrapper}>
                        <SettingsGroupTitle>
                            {t('AppSettingsDialog.AppearanceTab.theme.title')}
                        </SettingsGroupTitle>

                        <div className={styles.themeInputsWrapper}>
                            <Inputs.RadioInput.Provider
                                label={t('AppSettingsDialog.AppearanceTab.theme.dark.label')}
                                name={AppSettingsDialogForm.names.theme}
                                valueName='dark'
                            >
                                <Inputs.RadioInput.Indicator/>

                                <strong>
                                    {t('AppSettingsDialog.AppearanceTab.theme.dark.label')}
                                </strong>
                            </Inputs.RadioInput.Provider>

                            <Inputs.RadioInput.Provider
                                label={t('AppSettingsDialog.AppearanceTab.theme.light.label')}
                                name={AppSettingsDialogForm.names.theme}
                                valueName='light'
                            >
                                <Inputs.RadioInput.Indicator/>

                                <strong>
                                    {t('AppSettingsDialog.AppearanceTab.theme.light.label')}
                                </strong>
                            </Inputs.RadioInput.Provider>

                            <Inputs.RadioInput.Provider
                                label={t('AppSettingsDialog.AppearanceTab.theme.auto.label')}
                                name={AppSettingsDialogForm.names.theme}
                                valueName='auto'
                            >
                                <Inputs.RadioInput.Indicator/>

                                <strong>
                                    {t('AppSettingsDialog.AppearanceTab.theme.auto.label')}
                                </strong>
                            </Inputs.RadioInput.Provider>
                        </div>
                    </div>
                </Heading.Provider>

                <Separator spacing={40} length='100%' thickness={2}/>

                <Heading.Node>
                    <SettingsGroupTitle>
                        {t('AppSettingsDialog.AppearanceTab.messageDisplayMode.title')}
                    </SettingsGroupTitle>

                    <div className={styles.displayModeInputsWrapper}>
                        <Inputs.RadioInput.Provider
                            label={t('AppSettingsDialog.AppearanceTab.messageDisplayMode.cozy.label')}
                            name={AppSettingsDialogForm.names.messageDisplayMode}
                            valueName='cozy'
                        >
                            <Inputs.RadioInput.Indicator/>

                            <span>
                                <strong>
                                    {t('AppSettingsDialog.AppearanceTab.messageDisplayMode.cozy.description.value')}
                                </strong>

                                {t('AppSettingsDialog.AppearanceTab.messageDisplayMode.cozy.description.desc')}
                            </span>
                        </Inputs.RadioInput.Provider>

                        <Inputs.RadioInput.Provider
                            label={t('AppSettingsDialog.AppearanceTab.messageDisplayMode.compact.label')}
                            name={AppSettingsDialogForm.names.messageDisplayMode}
                            valueName='compact'
                        >
                            <Inputs.RadioInput.Indicator/>

                            <span>
                                <strong>
                                    {t('AppSettingsDialog.AppearanceTab.messageDisplayMode.compact.description.value')}
                                </strong>

                                {t('AppSettingsDialog.AppearanceTab.messageDisplayMode.compact.description.desc')}
                            </span>
                        </Inputs.RadioInput.Provider>
                    </div>
                </Heading.Node>

                <Separator spacing={40} length='100%' thickness={2}/>

                <Heading.Provider>
                    <SettingsGroupTitle>
                        {t('AppSettingsDialog.AppearanceTab.messageFontSize.title')}
                    </SettingsGroupTitle>

                    <Inputs.SliderInput.Provider
                        label={t('AppSettingsDialog.AppearanceTab.messageFontSize.title')}
                        name={AppSettingsDialogForm.names.messageFontSize}
                        range={messageFontSizeRange}
                    >
                        <Inputs.SliderInput.Node/>
                    </Inputs.SliderInput.Provider>
                </Heading.Provider>

                <Heading.Provider>
                    <div className={styles.groupGapWrapper}>
                        <SettingsGroupTitle>
                            {t('AppSettingsDialog.AppearanceTab.messageGroupGap.title')}
                        </SettingsGroupTitle>
                        <Inputs.SliderInput.Provider
                            label={t('AppSettingsDialog.AppearanceTab.messageGroupGap.title')}
                            name={AppSettingsDialogForm.names.messageGroupSpacing}
                            range={messageGroupSpacingRange}
                        >
                            <Inputs.SliderInput.Node/>
                        </Inputs.SliderInput.Provider>
                    </div>
                </Heading.Provider>
            </AppSettingsDialogTabs.Panel.AppearanceTab>
        </Heading.Provider>
    );
};