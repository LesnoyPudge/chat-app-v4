import { createWithDecorator } from '@lesnoypudge/utils-react';
import { Button, DialogBlocks, Form, Inputs } from '@/components';
import { useTrans } from '@/hooks';
import { Store } from '@/features';
import { Valibot } from '@/libs';
import { sharedValidators } from '@/fakeShared';
import { sleep } from '@lesnoypudge/utils';
import { createStyles } from '@/utils';



const styles = createStyles({
    content: 'gap-4',
});

const { withDecorator } = createWithDecorator<
    DialogBlocks.Types.PublicProps
>(({ children, controls }) => {
    const { t } = useTrans();

    return (
        <DialogBlocks.Base.Provider
            label={t('ChangePasswordDialog.label')}
            controls={controls}
        >
            <DialogBlocks.Base.Wrapper>
                {children}
            </DialogBlocks.Base.Wrapper>
        </DialogBlocks.Base.Provider>
    );
});

const { ChangePasswordForm } = Form.createForm({
    defaultValues: {
        oldPassword: '',
        newPassword: '',
    },
}).withName('ChangePassword');

export const ChangePasswordDialog = withDecorator(() => {
    const { t } = useTrans();
    const { closeOverlay } = DialogBlocks.useContextProxy();

    const [
        credentialsUpdataTrigger,
    ] = Store.Users.Api.useUserCredentialsUpdateMutation();

    const { form } = Form.useExtendForm(ChangePasswordForm, {
        trigger: ({ newPassword }) => {
            return credentialsUpdataTrigger({
                newPassword,
            });
        },
        onSubmitSuccessMounted: closeOverlay,
        validators: {
            onSubmit: Valibot.pipeAsync(
                Valibot.objectAsync({
                    oldPassword: sharedValidators.singleCommonString,
                    newPassword: sharedValidators.singleCommonString,
                }),

                Valibot.checkAsync(async ({ oldPassword }) => {
                    await sleep(300);

                    const store = Store.Utils.injectedStore.getStore();

                    const password = (
                        Store.Users.Selectors
                            .selectCurrentUserPassword(store.getState())
                    );

                    return password === oldPassword;
                }, t('ChangePasswordForm.errors.oldPasswordNotMatch')),

                Valibot.checkAsync(async ({ newPassword, oldPassword }) => {
                    await sleep(300);

                    return newPassword !== oldPassword;
                }, t('ChangePasswordForm.errors.samePassword')),
            ),
        },
    });

    return (
        <ChangePasswordForm.Provider form={form}>
            <DialogBlocks.Base.Inner>
                <Form.Node contents>
                    <DialogBlocks.Base.Header>
                        <DialogBlocks.Base.Title>
                            {t('ChangePasswordDialog.title')}
                        </DialogBlocks.Base.Title>

                        <DialogBlocks.Base.Subtitle>
                            {t('ChangePasswordDialog.subtitle')}
                        </DialogBlocks.Base.Subtitle>
                    </DialogBlocks.Base.Header>

                    <DialogBlocks.Base.Content className={styles.content}>
                        <Inputs.TextInput.Provider
                            label={t('ChangePasswordDialog.oldPassword.label')}
                            name={ChangePasswordForm.names.oldPassword}
                            required
                            placeholder='myPassword'
                        >
                            <div>
                                <Form.Label>
                                    {t('ChangePasswordDialog.oldPassword.label')}
                                </Form.Label>

                                <Inputs.TextInput.Wrapper>
                                    <Inputs.TextInput.Node/>

                                    <Inputs.TextInput.PasswordToggleButton/>
                                </Inputs.TextInput.Wrapper>
                            </div>
                        </Inputs.TextInput.Provider>

                        <Inputs.TextInput.Provider
                            label={t('ChangePasswordDialog.newPassword.label')}
                            name={ChangePasswordForm.names.newPassword}
                            required
                            placeholder='newPassword'
                        >
                            <div>
                                <Form.Label>
                                    {t('ChangePasswordDialog.newPassword.label')}
                                </Form.Label>

                                <Inputs.TextInput.Wrapper>
                                    <Inputs.TextInput.Node/>

                                    <Inputs.TextInput.PasswordToggleButton/>
                                </Inputs.TextInput.Wrapper>
                            </div>
                        </Inputs.TextInput.Provider>
                    </DialogBlocks.Base.Content>

                    <DialogBlocks.Base.Footer>
                        <Button
                            stylingPreset='lite'
                            size='medium'
                            onLeftClick={closeOverlay}
                        >
                            {t('COMMON.Close')}
                        </Button>

                        <Form.SubmitButton
                            stylingPreset='brand'
                            size='medium'
                        >
                            {t('COMMON.Change')}
                        </Form.SubmitButton>
                    </DialogBlocks.Base.Footer>
                </Form.Node>
            </DialogBlocks.Base.Inner>
        </ChangePasswordForm.Provider>
    );
});