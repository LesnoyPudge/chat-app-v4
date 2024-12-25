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

const LoginFormOptions = Form.createForm<Endpoints.V1.User.Login.RequestBody>({
    validator: ApiValidators.V1.User.login,
    defaultValues: {
        login: '',
        password: '',
    },
});

export const LoginForm: FC = () => {
    const [login] = Features.User.Api.useLoginMutation();
    const { t } = useTrans();
    const { changeTab } = useContextProxy(AuthTabContext);

    const { FormApi, submitError } = Form.useForm({
        ...LoginFormOptions,
        onSubmit: Form.apiAdapter(login, {
            errorTable: {
                BAD_REQUEST: t('LoginForm.BAD_REQUEST'),
            },
        }),
    });

    return (
        <Form.Provider formApi={FormApi} submitError={submitError}>
            <Form.Node>
                <Heading.Node className={styles.title}>
                    {t('LoginForm.title')}
                </Heading.Node>

                <div className={styles.subtitle}>
                    {t('LoginForm.subtitle')}
                </div>

                <FormApi.Field name='login'>
                    {(field) => (
                        <>
                            <Label.Node
                                className={styles.label}
                                htmlFor={field.name}
                            >
                                {t('LoginForm.loginLabel')}

                                <Label.Wildcard/>

                                <Label.Error field={field}/>
                            </Label.Node>

                            <Form.Inputs.TextInput.Node
                                type='text'
                                label={t('LoginForm.loginLabel')}
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
                                {t('LoginForm.passwordLabel')}

                                <Label.Wildcard/>

                                <Label.Error field={field}/>
                            </Label.Node>

                            <Form.Inputs.TextInput.Provider
                                type='password'
                                field={field}
                                label={t('LoginForm.passwordLabel')}
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

                <Form.Error className={styles.formError}/>

                <FormApi.Subscribe selector={(state) => state.isSubmitting}>
                    {(isSubmitting) => (
                        <Button
                            className={styles.submit}
                            type='submit'
                            stylingPreset='brand'
                            isLoading={isSubmitting}
                        >
                            <WithLoadingIndicator isLoading={isSubmitting}>
                                {t('LoginForm.submit')}
                            </WithLoadingIndicator>
                        </Button>
                    )}
                </FormApi.Subscribe>

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