import { DialogBlocks, Form, Tab } from '@/components';
import { Store } from '@/features';
import { useTrans } from '@/hooks';
import { createWithDecorator, withDisplayName } from '@lesnoypudge/utils-react';
import { Navigation, OverviewTab } from './components';
import { invariant } from '@lesnoypudge/utils';
import { decorate } from '@lesnoypudge/macro';



export const { ChannelSettingsDialogTabs } = Tab.createTypedTabs({
    name: 'ChannelSettingsDialog',
    tabs: {
        OverviewTab: <OverviewTab/>,
    },
});

export const { ChannelSettingsForm } = Form.createForm({
    defaultValues: {
        name: '',
    },
}).withName('ChannelSettings');

const { withDecorator } = createWithDecorator<
    DialogBlocks.Types.PublicProps
>(({ children, controls }) => {
    const { t } = useTrans();

    return (
        <DialogBlocks.FullScreen.Provider
            label={t('ChannelSettingsDialog.label')}
            controls={controls}
        >
            <DialogBlocks.FullScreen.Wrapper>
                {children}
            </DialogBlocks.FullScreen.Wrapper>
        </DialogBlocks.FullScreen.Provider>
    );
});

type Props = {
    channelId: string;
};

decorate(withDisplayName, 'ChannelSettingsDialog', decorate.target);

export const ChannelSettingsDialog = withDecorator<Props>(({
    channelId,
}) => {
    const { resetShakeStacks } = DialogBlocks.FullScreen.useContextProxy();
    const { label } = DialogBlocks.useContextProxy();
    const [updateTrigger] = Store.Channels.Api.useChannelUpdateMutation();

    const channelName = Store.useSelector(
        Store.Channels.Selectors.selectNameById(channelId),
    );
    invariant(channelName);

    const { form } = Form.useExtendForm(ChannelSettingsForm, {
        trigger: ({ name }) => updateTrigger({ channelId, name }),
        defaultValues: {
            name: channelName,
        },
        onSubmitSuccess: resetShakeStacks,
        onReset: resetShakeStacks,
    });

    const {
        handleTabChange,
    } = DialogBlocks.FullScreen.useHandleTabChange(form);

    return (
        <ChannelSettingsForm.Provider form={form}>
            <ChannelSettingsDialogTabs.Provider
                label={label}
                initialTab={ChannelSettingsDialogTabs.tabNameTable.OverviewTab}
                onTabChange={handleTabChange}
                orientation='vertical'
            >
                <Form.Node contents>
                    <DialogBlocks.FullScreen.Shaker>
                        <DialogBlocks.FullScreen.NavigationSide>
                            <Navigation channelId={channelId}/>
                        </DialogBlocks.FullScreen.NavigationSide>

                        <DialogBlocks.FullScreen.ContentSide>
                            <ChannelSettingsDialogTabs.Current/>
                        </DialogBlocks.FullScreen.ContentSide>
                    </DialogBlocks.FullScreen.Shaker>
                </Form.Node>
            </ChannelSettingsDialogTabs.Provider>
        </ChannelSettingsForm.Provider>
    );
});