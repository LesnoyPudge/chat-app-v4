import { Button, Form, Label, Modal } from '@components';
import { ApiValidators, Endpoints } from '@fakeShared';
import { ContextSelectable, useMountedWrapper } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { CreateServerTabContext } from '../../CreateServerModal';
import { Features } from '@redux/features';
import { createStyles } from '@utils';
import { useTrans } from '@hooks';
import { Navigator } from '@features';



type FollowInvitationFormValues = Endpoints.V1.Server.AcceptInvitation.RequestBody;

const FollowInvitationForm = Form.createForm<FollowInvitationFormValues>({
    defaultValues: {
        invitationCode: '',
    },
    validator: ApiValidators.V1.Server.acceptInvitation,
});

const styles = createStyles({
    content: 'gap-2.5',
});

export const FollowInvitationTab: FC = () => {
    const { changeTab } = ContextSelectable.useProxy(CreateServerTabContext);
    const { closeOverlay } = ContextSelectable.useProxy(Modal.Context);
    const { navigateTo } = Navigator.useNavigator();
    const { mounted } = useMountedWrapper();
    const [accept] = Features.Servers.Api.useAcceptInvitationMutation();
    const { t } = useTrans();

    const { FormApi, submitError } = Form.useForm({
        ...FollowInvitationForm,
        onSubmit: Form.apiAdapter(accept, {
            onSuccess: (server) => mounted(() => {
                closeOverlay();
                void navigateTo.server({ serverId: server.id });
            }),
        }),
    });

    const invitePlaceholder = `hTkzmak`;

    return (
        <Form.Provider formApi={FormApi} submitError={submitError}>
            <Form.Node>
                <Modal.Base.Header>
                    <Modal.Base.Title>
                        {t('CreateServerModal.FollowInvitationTab.title')}
                    </Modal.Base.Title>

                    <Modal.Base.Subtitle>
                        {t('CreateServerModal.FollowInvitationTab.subtitle')}
                    </Modal.Base.Subtitle>
                </Modal.Base.Header>

                <Modal.Base.Content className={styles.content}>
                    <FormApi.Field name='invitationCode'>
                        {(field) => (
                            <Form.Inputs.TextInput.Provider
                                field={field}
                                label={t('CreateServerModal.FollowInvitationTab.invitationCodeInput.label')}
                                type='text'
                                placeholder={invitePlaceholder}
                                required
                            >
                                <div>
                                    <Label.Node htmlFor={field.name}>
                                        {t('CreateServerModal.FollowInvitationTab.invitationCodeInput.label')}

                                        <Label.Wildcard/>

                                        <Label.Error field={field}/>
                                    </Label.Node>

                                    <Form.Inputs.TextInput.Node/>
                                </div>
                            </Form.Inputs.TextInput.Provider>
                        )}
                    </FormApi.Field>

                    <Form.Error/>
                </Modal.Base.Content>

                <Modal.Base.Footer>
                    <Button
                        stylingPreset='lite'
                        size='medium'
                        onLeftClick={changeTab.createServerOrFollowInvitation}
                    >
                        {t('CreateServerModal.FollowInvitationTab.goBackButton.text')}
                    </Button>

                    <FormApi.Subscribe selector={(s) => s.isSubmitting}>
                        {(isSubmitting) => (
                            <Button
                                stylingPreset='brand'
                                size='medium'
                                type='submit'
                                isLoading={isSubmitting}
                            >
                                {t('CreateServerModal.FollowInvitationTab.joinServerButton.text')}
                            </Button>
                        )}
                    </FormApi.Subscribe>
                </Modal.Base.Footer>
            </Form.Node>
        </Form.Provider>
    );
};