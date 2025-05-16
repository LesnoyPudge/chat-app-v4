import { FC } from 'react';
import {
    ServerSettingsDialogTabs,
    useServerSettingsDialogContextProxy,
} from '../../ServerSettingsDialog';
import { Store } from '@/features';
import { invariant } from '@lesnoypudge/utils';
import { DialogBlocks, Separator } from '@/components';
import { useTrans } from '@/hooks';



export const Navigation: FC = () => {
    const { t } = useTrans();
    const { serverId } = useServerSettingsDialogContextProxy();

    const serverName = Store.useSelector(
        Store.Servers.Selectors.selectNameById(serverId),
    );
    invariant(serverName);

    return (
        <ServerSettingsDialogTabs.List>
            <DialogBlocks.FullScreen.NavigationHeading>
                {t('ServerSettingsDialog.Navigation.overviewGroupHeading', {
                    serverName,
                })}
            </DialogBlocks.FullScreen.NavigationHeading>

            <ServerSettingsDialogTabs.Item.OverviewTab>
                {(tabProps) => (
                    <DialogBlocks.FullScreen.NavigationButton
                        {...tabProps}
                        label={t('ServerSettingsDialog.Navigation.overviewTabButton.label')}
                    >
                        {t('ServerSettingsDialog.Navigation.overviewTabButton.label')}
                    </DialogBlocks.FullScreen.NavigationButton>
                )}
            </ServerSettingsDialogTabs.Item.OverviewTab>

            <Separator spacing={16} thickness={2} length='100%'/>

            <DialogBlocks.FullScreen.NavigationHeading>
                {t('ServerSettingsDialog.Navigation.membersGroupHeading')}
            </DialogBlocks.FullScreen.NavigationHeading>

            <ServerSettingsDialogTabs.Item.MembersTab>
                {(tabProps) => (
                    <DialogBlocks.FullScreen.NavigationButton
                        {...tabProps}
                        label={t('ServerSettingsDialog.Navigation.membersTabButton.label')}
                    >
                        {t('ServerSettingsDialog.Navigation.membersTabButton.label')}
                    </DialogBlocks.FullScreen.NavigationButton>
                )}
            </ServerSettingsDialogTabs.Item.MembersTab>

            <ServerSettingsDialogTabs.Item.BannedTab>
                {(tabProps) => (
                    <DialogBlocks.FullScreen.NavigationButton
                        {...tabProps}
                        label={t('ServerSettingsDialog.Navigation.bannedTabButton.label')}
                    >
                        {t('ServerSettingsDialog.Navigation.bannedTabButton.label')}
                    </DialogBlocks.FullScreen.NavigationButton>
                )}
            </ServerSettingsDialogTabs.Item.BannedTab>
        </ServerSettingsDialogTabs.List>
    );
};