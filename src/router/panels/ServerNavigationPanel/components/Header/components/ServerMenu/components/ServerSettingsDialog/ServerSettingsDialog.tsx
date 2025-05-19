import { DialogBlocks, Form, Tab } from '@/components';
import { Store } from '@/features';
import { useTrans } from '@/hooks';
import { decorate } from '@lesnoypudge/macro';
import { invariant } from '@lesnoypudge/utils';
import {
    ContextSelectable,
    createWithDecorator,
    withDisplayName,
} from '@lesnoypudge/utils-react';
import { BannedTab, MembersTab, Navigation, OverviewTab } from './components';
import { Endpoints } from 'fakeShared/endpoints';
import { T } from '@lesnoypudge/types-utils-base';
import { ExtendedRecord } from '@/types';



export const {
    ServerSettingsDialogContext,
    useServerSettingsDialogContextProxy,
} = ContextSelectable.createContextWithHooks<{
    serverId: string;
}>().withName('ServerSettingsDialog');

export const { ServerSettingsDialogTabs } = Tab.createTypedTabs({
    name: 'ServerSettingsDialog',
    tabs: {
        OverviewTab: <OverviewTab/>,
        MembersTab: <MembersTab/>,
        BannedTab: <BannedTab/>,
    },
});

type FormValues = T.Simplify<(
    Pick<
        Required<Endpoints.V1.Server.Update.RequestBody>,
        'name'
    >
    & ExtendedRecord<
        Pick<
            Required<Endpoints.V1.Server.Update.RequestBody>,
            'avatar'
        >,
        undefined
    >
)>;

export const { ServerSettingsForm } = Form.createForm<FormValues>({
    defaultValues: {
        name: '',
        avatar: undefined,
    },
}).withName('ServerSettings');

const { withDecorator } = createWithDecorator<
    DialogBlocks.Types.PublicProps
>(({ children, controls }) => {
    const { t } = useTrans();

    return (
        <DialogBlocks.FullScreen.Provider
            label={t('ServerSettingsDialog.label')}
            controls={controls}
        >
            <DialogBlocks.FullScreen.Wrapper>
                {children}
            </DialogBlocks.FullScreen.Wrapper>
        </DialogBlocks.FullScreen.Provider>
    );
});

type Props = {
    serverId: string;
};

decorate(withDisplayName, 'ServerSettingsDialog', decorate.target);

export const ServerSettingsDialog = withDecorator<Props>(({
    serverId,
}) => {
    const { resetShakeStacks } = DialogBlocks.FullScreen.useContextProxy();
    const { label } = DialogBlocks.useContextProxy();
    const [updateTrigger] = Store.Servers.Api.useServerUpdateMutation();

    const serverName = Store.useSelector(
        Store.Servers.Selectors.selectNameById(serverId),
    );
    invariant(serverName);

    const { form } = Form.useExtendForm(ServerSettingsForm, {
        trigger: ({ name, avatar }) => updateTrigger({
            serverId,
            name,
            avatar,
        }),
        defaultValues: {
            name: serverName,
            avatar: undefined,
        },
        onSubmitSuccess: resetShakeStacks,
        onReset: resetShakeStacks,
    });

    const {
        handleTabChange,
    } = DialogBlocks.FullScreen.useHandleTabChange(form);

    return (
        <ServerSettingsDialogContext.Provider value={{ serverId }}>
            <ServerSettingsForm.Provider form={form}>
                <ServerSettingsDialogTabs.Provider
                    label={label}
                    initialTab={ServerSettingsDialogTabs.tabNameTable.OverviewTab}
                    onTabChange={handleTabChange}
                    orientation='vertical'
                >
                    <Form.Node contents>
                        <DialogBlocks.FullScreen.Shaker>
                            <DialogBlocks.FullScreen.NavigationSide>
                                <Navigation/>
                            </DialogBlocks.FullScreen.NavigationSide>

                            <DialogBlocks.FullScreen.ContentSide>
                                <ServerSettingsDialogTabs.Current/>
                            </DialogBlocks.FullScreen.ContentSide>
                        </DialogBlocks.FullScreen.Shaker>
                    </Form.Node>
                </ServerSettingsDialogTabs.Provider>
            </ServerSettingsForm.Provider>
        </ServerSettingsDialogContext.Provider>
    );
});