import { DialogBlocks, Form, Tab } from '@/components';
import { decorate } from '@lesnoypudge/macro';
import { createWithDecorator, withDisplayName } from '@lesnoypudge/utils-react';
import { useTrans } from '@/hooks';
import { AppearanceTab, Navigation, ProfileTab } from './components';
import { Store } from '@/features';
import { Endpoints } from '@/fakeShared';



const tabs = Tab.createTabs({
    profileTab: <ProfileTab/>,
    appearanceTab: <AppearanceTab/>,
});

const { tabName } = Tab.createProps(tabs);

export const AppSettingsDialogTabContext = Tab.createTabContext<typeof tabs>();

type AppSettingsForm = (
    Pick<
        Endpoints.V1.User.ProfileUpdate.RequestBody,
        'avatar'
    >
    & Pick<
        NonNullable<Endpoints.V1.User.ProfileUpdate.RequestBody['settings']>,
        'messageDisplayMode' | 'theme'
    >
);

const { AppSettingsForm } = Form.createForm<AppSettingsForm>({
    defaultValues: {
        avatar: null,
        theme: 'dark',
        messageDisplayMode: 'cozy',
    },
}).withName('AppSettings');

const { withDecorator } = createWithDecorator<
    DialogBlocks.Types.PublicProps
>(({ children, controls }) => {
    const { t } = useTrans();

    return (
        <DialogBlocks.FullScreen.Provider
            label={t('AppSettingsDialog.label')}
            controls={controls}
        >
            <DialogBlocks.FullScreen.Wrapper>
                {children}
            </DialogBlocks.FullScreen.Wrapper>
        </DialogBlocks.FullScreen.Provider>
    );
});

decorate(withDisplayName, 'AppSettingsDialog', decorate.target);

export const AppSettingsDialog = withDecorator(() => {
    const { resetShakeStacks } = DialogBlocks.FullScreen.useContextProxy();

    const [
        updateProfile,
    ] = Store.Users.Api.useUserProfileUpdateMutation();

    const {
        theme,
        messageDisplayMode,
    } = Store.useSelector(Store.Users.Selectors.selectCurrentUserSettings);

    const { form } = Form.useExtendForm(AppSettingsForm, {
        trigger: ({ avatar, messageDisplayMode, theme }) => {
            return updateProfile({
                avatar,
                settings: {
                    theme,
                    messageDisplayMode,
                },
            });
        },
        onSubmitSuccess: resetShakeStacks,
        onReset: resetShakeStacks,
        defaultValues: {
            messageDisplayMode,
            theme,
        },
    });

    const {
        handleTabChange,
    } = DialogBlocks.FullScreen.useHandleTabChange(form);

    return (
        <AppSettingsForm.Provider form={form}>
            <Tab.Provider
                context={AppSettingsDialogTabContext}
                tabs={tabs}
                initialTab={tabName.profileTab}
                onTabChange={handleTabChange}
            >
                <Form.Node>
                    <DialogBlocks.FullScreen.Wrapper>
                        <DialogBlocks.FullScreen.NavigationSide>
                            <Navigation/>
                        </DialogBlocks.FullScreen.NavigationSide>

                        <DialogBlocks.FullScreen.ContentSide>
                            <Tab.Current context={AppSettingsDialogTabContext}/>
                        </DialogBlocks.FullScreen.ContentSide>
                    </DialogBlocks.FullScreen.Wrapper>
                </Form.Node>
            </Tab.Provider>
        </AppSettingsForm.Provider>
    );
});