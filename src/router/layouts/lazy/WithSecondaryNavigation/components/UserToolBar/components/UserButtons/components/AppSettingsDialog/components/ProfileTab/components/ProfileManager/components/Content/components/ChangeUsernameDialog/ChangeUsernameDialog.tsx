import { Button, DialogBlocks, Form, Inputs } from '@/components';
import { useTrans } from '@/hooks';
import { createWithDecorator } from '@lesnoypudge/utils-react';
import { Endpoints, sharedValidators } from '@/fakeShared';
import { Store } from '@/features';
import { Valibot } from '@/libs';



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

type FormValues = Pick<
    Required<Endpoints.V1.User.ProfileUpdate.RequestBody>,
    'name'
>;

const { ChangeUsernameForm } = Form.createForm<FormValues>({
    defaultValues: {
        name: '',
    },
}).withName('ChangeUsername');

export const ChangeUsernameDialog = withDecorator(() => {
    const { t } = useTrans();
    const { closeOverlay } = DialogBlocks.useContextProxy();

    const [
        profileUpdataTrigger,
    ] = Store.Users.Api.useUserProfileUpdateMutation();

    const { form } = Form.useExtendForm(ChangeUsernameForm, {
        trigger: (values) => {
            return profileUpdataTrigger(values);
        },
        onSubmitSuccessMounted: closeOverlay,
        validators: {
            onSubmit: Valibot.object({
                name: sharedValidators.singleCommonString,
            }),
        },
    });

    return (
        <ChangeUsernameForm.Provider form={form}>
            <DialogBlocks.Base.Inner>
                <Form.Node contents>
                    <DialogBlocks.Base.Header>
                        <DialogBlocks.Base.Title>
                            {t('ChangeUsernameDialog.title')}
                        </DialogBlocks.Base.Title>

                        <DialogBlocks.Base.Subtitle>
                            {t('ChangeUsernameDialog.subtitle')}
                        </DialogBlocks.Base.Subtitle>
                    </DialogBlocks.Base.Header>

                    <DialogBlocks.Base.Content>
                        <Inputs.TextInput.Provider
                            label={t('ChangeUsernameDialog.name.label')}
                            name={ChangeUsernameForm.names.name}
                            required
                            placeholder='newName'
                        >
                            <Form.Label>
                                {t('ChangeUsernameDialog.name.label')}
                            </Form.Label>

                            <Inputs.TextInput.Wrapper>
                                <Inputs.TextInput.Node/>

                                <Inputs.TextInput.PasswordToggleButton/>
                            </Inputs.TextInput.Wrapper>
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
        </ChangeUsernameForm.Provider>
    );
});