import { Button, Form, Label } from '@components';
import { Endpoints, ApiValidators } from '@fakeShared';
import { useTrans } from '@i18n';
import { Heading, useContextProxy } from '@lesnoypudge/utils-react';
import { Features } from '@redux/features';
import { createStyles } from '@utils';
import { FC } from 'react';
import { AuthTabContext } from '../../AuthScreen';
import { WithLoadingIndicator } from '../LoadingIndicator';



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

const RegistrationFormOptions = Form.createForm<
    Endpoints.V1.User.Registration.RequestBody
>({
    validator: ApiValidators.V1.User.registration,
    defaultValues: {
        login: '',
        password: '',
        name: '',
    },
});

export const RegistrationForm: FC = () => {
    const [registration] = Features.User.Api.useRegistrationMutation();
    const { t } = useTrans();
    const { changeTab } = useContextProxy(AuthTabContext);

    const FormApi = Form.useForm({
        ...RegistrationFormOptions,
        onSubmit: Form.apiAdapter(registration),
    });

    return (
        <Form.Node onSubmit={FormApi.handleSubmit}>
            <Heading.Node className={styles.title}>
                {t('RegistrationForm.title')}
            </Heading.Node>

            <FormApi.Field name='name'>
                {(field) => (
                    <>
                        <Label.Node
                            className={styles.label}
                            htmlFor={field.name}
                        >
                            {t('RegistrationForm.nameFieldLabel')}

                            <Label.Wildcard/>

                            <Label.Error field={field}/>
                        </Label.Node>

                        <Form.Inputs.TextInput.Node
                            type='text'
                            label={t('RegistrationForm.nameFieldLabel')}
                            placeholder='myNickname'
                            required
                            field={field}
                        />
                    </>
                )}
            </FormApi.Field>

            <FormApi.Field name='login'>
                {(field) => (
                    <>
                        <Label.Node
                            className={styles.label}
                            htmlFor={field.name}
                        >
                            {t('RegistrationForm.loginLabel')}

                            <Label.Wildcard/>

                            <Label.Error field={field}/>
                        </Label.Node>

                        <Form.Inputs.TextInput.Node
                            type='text'
                            label={t('RegistrationForm.loginLabel')}
                            placeholder='myLogin'
                            required
                            field={field}
                        />
                    </>
                )}
            </FormApi.Field>

            <FormApi.Field name='password'>
                {(field) => (
                    <>
                        <Label.Node
                            className={styles.label}
                            htmlFor={field.name}
                        >
                            {t('RegistrationForm.passwordLabel')}

                            <Label.Wildcard/>

                            <Label.Error field={field}/>
                        </Label.Node>

                        <Form.Inputs.TextInput.Provider
                            type='password'
                            field={field}
                            label={t('RegistrationForm.passwordLabel')}
                            required
                            placeholder='myPassword'
                        >
                            <Form.Inputs.TextInput.Wrapper>
                                <Form.Inputs.TextInput.Node/>

                                <Form.Inputs.TextInput.PasswordToggleButton/>
                            </Form.Inputs.TextInput.Wrapper>
                        </Form.Inputs.TextInput.Provider>
                    </>
                )}
            </FormApi.Field>

            <Form.Error
                className={styles.formError}
                formApi={FormApi}
            />

            <FormApi.Subscribe selector={(state) => state.isSubmitting}>
                {(isSubmitting) => (
                    <Button
                        className={styles.submit}
                        type='submit'
                        stylingPreset='brand'
                        isLoading={isSubmitting}
                    >
                        <WithLoadingIndicator isLoading={isSubmitting}>
                            {t('RegistrationForm.submit')}
                        </WithLoadingIndicator>
                    </Button>
                )}
            </FormApi.Subscribe>

            <Button
                className={styles.loginFormButton}
                stylingPreset='link'
                onLeftClick={changeTab.login}
            >
                {t('RegistrationForm.loginSuggestion')}
            </Button>
        </Form.Node>
    );
};