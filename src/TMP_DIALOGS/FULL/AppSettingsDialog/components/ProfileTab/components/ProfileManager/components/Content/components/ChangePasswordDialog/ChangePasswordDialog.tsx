import { createWithDecorator } from '@lesnoypudge/utils-react';
import { DialogBlocks } from '@/components';
import { useTrans } from '@/hooks';



type FormValues = {
    oldPassword: string;
    newPassword: string;
    newPasswordAgain: string;
};

const initialValues: FormValues = {
    oldPassword: '',
    newPassword: '',
    newPasswordAgain: '',
};

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

export const ChangePasswordDialog = withDecorator(() => {
    return (
        <ModalWindow
            label='Изменить пароль'
            withBackdrop
        >
            {({ closeOverlay }) => {
                const handleSubmit = (values: FormValues) => {
                    console.log('form submited', values);
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
                                        <>Обновите пароль</>
                                    </ModalTitle>

                                    <ModalSubtitle>
                                        <>Введите текущий и новый пароли.</>
                                    </ModalSubtitle>
                                </ModalHeader>

                                <ModalContent className='gap-4'>
                                    <PasswordTypeToggle>
                                        {({ toggleType, type }) => (
                                            <FormikTextInput
                                                name='oldPassword'
                                                label='Текущий пароль'
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

                                    <PasswordTypeToggle>
                                        {({ toggleType, type }) => (
                                            <FormikTextInput
                                                name='newPassword'
                                                label='Новый пароль'
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

                                    <PasswordTypeToggle>
                                        {({ toggleType, type }) => (
                                            <FormikTextInput
                                                name='newPasswordAgain'
                                                label='Подтверждение нового пароля'
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