import { Form } from '@components';
import { Endpoints, Validators } from '@fakeShared';
import { FC } from 'react';



const LoginFormOptions = Form.createForm<Endpoints.V1.User.Login.RequestBody>({
    validator: Validators.V1.User.login,
    defaultValues: {
        login: '',
        password: '',
    },
});

const LoginFormContext = Form.createFormContext<
    Endpoints.V1.User.Login.RequestBody
>();

export const LoginForm: FC = () => {
    const FormApi = Form.useForm({
        ...LoginFormOptions,
        onSubmit: ({ value }) => {
            value.login.toString();
        },
    });

    return (
        <LoginFormContext.Provider value={FormApi}>
            <Form.Node onSubmit={FormApi.handleSubmit}>
                <>qwe</>
            </Form.Node>
        </LoginFormContext.Provider>
    );
};