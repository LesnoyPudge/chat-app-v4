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
        font-bold 
        text-color-primary
    `,
    label: 'mt-5',
    formError: 'mt-5',
    submit: 'mt-5 h-11 w-full font-bold',
    loginFormButton: 'mt-2 self-start',
});

const { RegistrationForm } = Form.createForm<
    Endpoints.V1.User.Registration.RequestBody
>({
    validator: ApiValidators.UserRegistration,
    defaultValues: {
        login: '',
        password: '',
        name: '',
    },
}).withName('Registration');

export const RegistrationFormComponent: FC = () => {
    const [registration] = Store.Users.Api.useUserRegistrationMutation();
    const { t } = useTrans();
    const { changeTab } = ContextSelectable.useProxy(AuthTabContext);

    const { form } = Form.useExtendForm(RegistrationForm, {
        trigger: registration,
    });

    return (
        <Form.Provider form={form}>
            <Form.Node>
                <Heading.Node className={styles.title}>
                    {t('RegistrationForm.title')}
                </Heading.Node>

                <Inputs.TextInput.Provider
                    name={RegistrationForm.names.name}
                    label={t('RegistrationForm.nameFieldLabel')}
                    placeholder='myNickname'
                    required
                >
                    <Form.Label className={styles.label}>
                        {t('RegistrationForm.nameFieldLabel')}
                    </Form.Label>

                    <Inputs.TextInput.Node/>
                </Inputs.TextInput.Provider>

                <Inputs.TextInput.Provider
                    name={RegistrationForm.names.login}
                    label={t('RegistrationForm.loginLabel')}
                    placeholder='myLogin'
                    required
                >
                    <Form.Label className={styles.label}>
                        {t('RegistrationForm.loginLabel')}
                    </Form.Label>

                    <Inputs.TextInput.Node/>
                </Inputs.TextInput.Provider>

                <Inputs.TextInput.Provider
                    name={RegistrationForm.names.password}
                    label={t('RegistrationForm.passwordLabel')}
                    placeholder='myPassword'
                    type='password'
                    required
                >
                    <Form.Label className={styles.label}>
                        {t('RegistrationForm.passwordLabel')}
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
                        {t('RegistrationForm.submit')}
                    </WithLoadingIndicator>
                </Form.SubmitButton>

                <Button
                    className={styles.loginFormButton}
                    stylingPreset='link'
                    onLeftClick={changeTab.login}
                >
                    {t('RegistrationForm.loginSuggestion')}
                </Button>
            </Form.Node>
        </Form.Provider>
    );
};