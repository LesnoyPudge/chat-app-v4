import { Button, Form, Inputs } from '@/components';
import { Endpoints, ApiValidators } from '@/fakeShared';
import { useTrans } from '@/hooks';
import { Heading, ContextSelectable } from '@lesnoypudge/utils-react';
import { createStyles } from '@/utils';
import { FC } from 'react';
import { AuthTabContext } from '../../AuthScreen';
import { WithLoadingIndicator } from '../LoadingIndicator';
import { Store } from '@/features';



const styles = createStyles({
    title: `
        text-center 
        text-25-30 
        font-semibold 
        text-color-primary
    `,
    subtitle: 'mt-2 text-center text-color-secondary',
    label: 'mt-5',
    formError: 'mt-5',
    submit: 'mt-5 h-11 w-full',
    extraBlock: 'mt-2 flex flex-wrap items-center gap-1 self-start',
    extraText: 'text-sm text-color-muted',
});

const { LoginForm } = Form.createForm<Endpoints.V1.User.Login.RequestBody>({
    validator: ApiValidators.UserLogin,
    defaultValues: {
        login: '',
        password: '',
    },
}).withName('Login');

export const LoginFormComponent: FC = () => {
    const [login] = Store.Users.Api.useUserLoginMutation();
    const { t } = useTrans();
    const { changeTab } = ContextSelectable.useProxy(AuthTabContext);

    const { form } = Form.useExtendForm(LoginForm, {
        trigger: login,
        errorTable: {
            BAD_REQUEST: t('LoginForm.BAD_REQUEST'),
        },
    });

    return (
        <Form.Provider form={form}>
            <Form.Node>
                <Heading.Node className={styles.title}>
                    {t('LoginForm.title')}
                </Heading.Node>

                <div className={styles.subtitle}>
                    {t('LoginForm.subtitle')}
                </div>

                <Inputs.TextInput.Provider
                    label={t('LoginForm.loginLabel')}
                    name={LoginForm.names.login}
                    placeholder='myLogin'
                    required
                >
                    <Form.Label className={styles.label}>
                        {t('LoginForm.loginLabel')}
                    </Form.Label>

                    <Inputs.TextInput.Node/>
                </Inputs.TextInput.Provider>

                <Inputs.TextInput.Provider
                    label={t('LoginForm.passwordLabel')}
                    name={LoginForm.names.password}
                    placeholder='myPassword'
                    type='password'
                    required
                >
                    <Form.Label className={styles.label}>
                        {t('LoginForm.passwordLabel')}
                    </Form.Label>

                    <Inputs.TextInput.Wrapper>
                        <Inputs.TextInput.Node/>

                        <Inputs.TextInput.PasswordToggleButton/>
                    </Inputs.TextInput.Wrapper>
                </Inputs.TextInput.Provider>

                <Form.Error className={styles.formError}/>

                <Form.SubmitButton
                    className={styles.submit}
                    stylingPreset='brand'
                >
                    <WithLoadingIndicator>
                        {t('LoginForm.submit')}
                    </WithLoadingIndicator>
                </Form.SubmitButton>

                <div className={styles.extraBlock}>
                    <span className={styles.extraText}>
                        {t('LoginForm.registrationSuggestion')}
                    </span>

                    <Button
                        stylingPreset='link'
                        onLeftClick={changeTab.registration}
                    >
                        {t('LoginForm.registrationButton')}
                    </Button>
                </div>
            </Form.Node>
        </Form.Provider>
    );
};