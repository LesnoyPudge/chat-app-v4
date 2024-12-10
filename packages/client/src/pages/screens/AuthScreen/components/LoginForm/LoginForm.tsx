import { Form } from '@components';
import { Endpoints, Validators } from '@fakeShared';
import { Heading } from '@lesnoypudge/utils-react';
import { Features } from '@redux/features';
import { createStyles } from '@utils';
import { FC } from 'react';



const styles = createStyles({
    title: `
        mb-2 
        text-center 
        text-25/30 
        font-semibold 
        text-color-primary
    `,
    subtitle: 'mb-5 text-center text-color-secondary',
});

const LoginFormOptions = Form.createForm<Endpoints.V1.User.Login.RequestBody>({
    validator: Validators.V1.User.login,
    defaultValues: {
        login: '',
        password: '',
    },
});

const TestFormOptions = Form.createForm({
    defaultValues: {
        some: false,
    },
});

export const LoginForm: FC = () => {
    const [login] = Features.User.Api.useLoginMutation();

    const FormApi = Form.useForm({
        // ...LoginFormOptions,
        ...TestFormOptions,
        // onSubmit: ({ value }) => login(value),
    });

    return (
        <Form.Node onSubmit={FormApi.handleSubmit}>
            <Heading.Node className={styles.title}>
                <>С возвращением</>
            </Heading.Node>

            <div className={styles.subtitle}>
                <>Мы так рады видеть вас снова!</>
            </div>

            <FormApi.Field name='some'>
                {(field) => {
                    field.name;
                    field.state.value;
                    // field.
                    return (
                        <></>
                    );
                }}
            </FormApi.Field>

            {/* <FormApi.Field. name='login'>
                {({}) => (
                    <div className='mb-5'>
                        {handleChange}
                        <FieldLabel htmlFor={props.id}>
                            {props.label}

                            <RequiredWildcard/>

                            <ErrorInLabel error={props.error}/>
                        </FieldLabel>

                        <TextInput {...props}/>
                    </div>
                )}
            </FormApi.Field.>
            <FormikTextInput
                label='Логин'
                name='login'
                placeholder='myLogin'
                required
            >
                {(props) => (

                )}
            </FormikTextInput>

            <PasswordTypeToggle>
                {({ toggleType, type }) => (
                    <FormikTextInput
                        label='Пароль'
                        name='password'
                        type={type}
                        required
                        placeholder='myPassword'
                    >
                        {(props) => (
                            <div className='mb-5'>
                                <FieldLabel htmlFor={props.id}>
                                    {props.label}

                                    <RequiredWildcard/>

                                    <ErrorInLabel error={props.error}/>
                                </FieldLabel>

                                <TextInputWrapper>
                                    <TextInput {...props}/>

                                    <PasswordTypeToggleButton
                                        type={type}
                                        onToggle={toggleType}
                                    />
                                </TextInputWrapper>
                            </div>
                        )}
                    </FormikTextInput>
                )}
            </PasswordTypeToggle>

            <FormError
                className='mb-2'
                error={helpers.error}
            />

            <Button
                className='mb-2 h-11 w-full'
                type='submit'
                stylingPreset='brand'
                isLoading={helpers.isLoading}
            >
                <ContentWithLoading isLoading={helpers.isLoading}>
                    <>Вход</>
                </ContentWithLoading>
            </Button>

            <div className='flex flex-wrap items-center self-start'>
                <span className='mr-1 text-sm text-color-muted'>
                    <>Нужна учётная запись?</>
                </span>

                <Button
                    stylingPreset='link'
                    onLeftClick={changeTab.registrationForm}
                >
                    <>Зарегистрироваться</>
                </Button>
            </div> */}
        </Form.Node>
    );
};