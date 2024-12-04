import { Form } from '@components';
import { Endpoints, Validators } from '@fakeShared';
import { useForm } from '@tanstack/react-form';
import { createForm } from '@utils';
import { FC } from 'react';



const LoginFormOptions = createForm<Endpoints.V1.User.Login.RequestBody>({
    validator: Validators.V1.User.login,
    defaultValues: {
        login: '',
        password: '',
    },
});

export const LoginForm: FC = () => {
    const FormApi = useForm(LoginFormOptions);

    return (
        <Form onSubmit={FormApi.handleSubmit}>
            <>qwe</>
        </Form>
    );
};