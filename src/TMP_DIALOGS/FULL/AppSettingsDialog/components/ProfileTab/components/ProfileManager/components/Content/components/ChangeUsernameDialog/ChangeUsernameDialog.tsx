import { DialogBlocks } from '@/components';
import { useTrans } from '@/hooks';
import { createWithDecorator } from '@lesnoypudge/utils-react';



type FormValues = {
    username: string;
    password: string;
};

const initialValues: FormValues = {
    username: '',
    password: '',
};

const { withDecorator } = createWithDecorator<
    DialogBlocks.Types.PublicProps
>(({ children, controls }) => {
    const { t } = useTrans();

    return (
        <DialogBlocks.Base.Provider
            label={t('ChangeUsernameDialog.label')}
            controls={controls}
        >
            <DialogBlocks.Base.Wrapper>
                {children}
            </DialogBlocks.Base.Wrapper>
        </DialogBlocks.Base.Provider>
    );
});

export const ChangeUsernameDialog = withDecorator(() => {
    return (
        <ModalWindow
            label='Изменить имя пользователя'
            withBackdrop
        >
            {({ closeOverlay }) => {
                const handleSubmit = (values: FormValues) => {
                    console.log('change username submit', values);
                    closeOverlay();
                };

                return (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <ModalContainer>
                                <ModalHeader>
                                    <ModalTitle>
                                        <>Измените имя пользователя</>
                                    </ModalTitle>

                                    <ModalSubtitle>
                                        <>Введите новое имя пользователя и текущий пароль.</>
                                    </ModalSubtitle>
                                </ModalHeader>

                                <ModalContent className='gap-4'>
                                    <FormikTextInput
                                        label='Имя пользователя'
                                        name='username'
                                        required
                                    >
                                        {(props) => (
                                            <div>
                                                <FieldLabel htmlFor={props.id}>
                                                    {props.label}
                                                </FieldLabel>

                                                <TextInput {...props}/>
                                            </div>
                                        )}
                                    </FormikTextInput>

                                    <PasswordTypeToggle>
                                        {({ toggleType, type }) => (
                                            <FormikTextInput
                                                label='Текущий пароль'
                                                name='password'
                                                type={type}
                                                required
                                            >
                                                {(props) => (
                                                    <div>
                                                        <FieldLabel htmlFor={props.id}>
                                                            {props.label}
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
                                </ModalContent>

                                <ModalFooter>
                                    <Button
                                        stylingPreset='lite'
                                        size='medium'
                                        onLeftClick={closeOverlay}
                                    >
                                        <>Отмена</>
                                    </Button>

                                    <Button
                                        type='submit'
                                        stylingPreset='brand'
                                        size='medium'
                                    >
                                        <>Готово</>
                                    </Button>
                                </ModalFooter>
                            </ModalContainer>
                        </Form>
                    </Formik>
                );
            }}
        </ModalWindow>
    );
});