import { DialogBlocks, Form, Tab } from '@/components';
import { decorate } from '@lesnoypudge/macro';
import { createWithDecorator, withDisplayName } from '@lesnoypudge/utils-react';
import { useTrans } from '@/hooks';
import { AppearanceTab, Navigation, ProfileTab } from './components';
import { Store } from '@/features';
import { Endpoints } from '@/fakeShared';
import { T } from '@lesnoypudge/types-utils-base/namespace';



export const { AppSettingsDialogTabs } = Tab.createTypedTabs({
    name: 'AppSettingsDialog',
    tabs: {
        ProfileTab: <ProfileTab/>,
        AppearanceTab: <AppearanceTab/>,
    },
});

export type AppSettingsDialogForm = T.Simplify<Required<(
    Pick<
        Endpoints.V1.User.ProfileUpdate.RequestBody,
        'avatar' | 'bannerColor'
    >
    & NonNullable<Endpoints.V1.User.ProfileUpdate.RequestBody['settings']>
)>>;

export const {
    AppSettingsDialogForm,
} = Form.createForm<AppSettingsDialogForm>({
    defaultValues: {
        avatar: null,
        theme: 'auto',
        messageDisplayMode: 'compact',
        bannerColor: '',
        messageFontSize: 12,
        messageGroupSpacing: 16,
    },
}).withName('AppSettingsDialog');

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
    const { label } = DialogBlocks.useContextProxy();

    const [
        updateProfile,
    ] = Store.Users.Api.useUserProfileUpdateMutation();

    const bannerColor = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserBannerColor,
    );

    const settings = Store.useSelector(
        Store.Users.Selectors.selectCurrentUserSettings,
    );

    const { form } = Form.useExtendForm(AppSettingsDialogForm, {
        trigger: ({ avatar, bannerColor, ...rest }) => {
            return updateProfile({
                avatar,
                bannerColor,
                settings: rest,
            });
        },
        onSubmitSuccess: resetShakeStacks,
        onReset: resetShakeStacks,
        defaultValues: {
            avatar: null,
            bannerColor,
            ...settings,
        },
    });

    const theme = Form.useFieldValue(
        Form.useField(form, AppSettingsDialogForm.names.theme),
    );

    const {
        handleTabChange,
    } = DialogBlocks.FullScreen.useHandleTabChange(form);

    return (
        <AppSettingsDialogForm.Provider form={form}>
            <AppSettingsDialogTabs.Provider
                label={label}
                initialTab={AppSettingsDialogTabs.tabNameTable.ProfileTab}
                onTabChange={handleTabChange}
                orientation='vertical'
            >
                <Form.Node>
                    <div data-theme={theme}>
                        <DialogBlocks.FullScreen.Shaker>
                            <DialogBlocks.FullScreen.NavigationSide>
                                <Navigation/>
                            </DialogBlocks.FullScreen.NavigationSide>

                            <DialogBlocks.FullScreen.ContentSide>
                                <AppSettingsDialogTabs.Current/>
                            </DialogBlocks.FullScreen.ContentSide>
                        </DialogBlocks.FullScreen.Shaker>
                    </div>
                </Form.Node>
            </AppSettingsDialogTabs.Provider>
        </AppSettingsDialogForm.Provider>
    );
});