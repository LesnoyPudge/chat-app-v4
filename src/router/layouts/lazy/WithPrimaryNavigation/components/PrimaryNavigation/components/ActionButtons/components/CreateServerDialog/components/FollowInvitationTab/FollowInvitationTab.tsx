import { Button, Form, Label, DialogBlocks } from '@/components';
import { ApiValidators, Endpoints } from '@/fakeShared';
import { ContextSelectable, useMountedWrapper } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { CreateServerTabContext } from '../../CreateServerDialog';
import { createStyles } from '@/utils';
import { useTrans } from '@/hooks';
import { Navigator, Store } from '@/features';



type FollowInvitationFormValues = Endpoints.V1.Server.AcceptInvitation.RequestBody;

const FollowInvitationForm = Form.createForm<FollowInvitationFormValues>({
    defaultValues: {
        invitationCode: '',
    },
    validator: ApiValidators.ServerAcceptInvitation,
});

const styles = createStyles({
    content: 'gap-2.5',
});

export const FollowInvitationTab: FC = () => {
    const { changeTab } = ContextSelectable.useProxy(CreateServerTabContext);
    const { closeOverlay } = ContextSelectable.useProxy(DialogBlocks.Context);
    const { navigateTo } = Navigator.useNavigateTo();
    const { mounted } = useMountedWrapper();
    const [accept] = Store.Servers.Api.useServerAcceptInvitationMutation();
    const { t } = useTrans();

    const { FormApi, submitError } = Form.useForm({
        ...FollowInvitationForm,
        onSubmit: Form.apiAdapter(accept, {
            onSuccess: (server) => mounted(() => {
                closeOverlay();
                navigateTo.server({ serverId: server.id });
            }),
        }),
    });

    const invitePlaceholder = `hTkzmak`;

    return (
        <Form.Provider formApi={FormApi} submitError={submitError}>
            <Form.Node>
                <DialogBlocks.Base.Header>
                    <DialogBlocks.Base.Title>
                        {t('CreateServerDialog.FollowInvitationTab.title')}
                    </DialogBlocks.Base.Title>

                    <DialogBlocks.Base.Subtitle>
                        {t('CreateServerDialog.FollowInvitationTab.subtitle')}
                    </DialogBlocks.Base.Subtitle>
                </DialogBlocks.Base.Header>

                <DialogBlocks.Base.Content className={styles.content}>
                    <FormApi.Field name='invitationCode'>
                        {(field) => (
                            <Form.Inputs.TextInput.Provider
                                field={field}
                                label={t('CreateServerDialog.FollowInvitationTab.invitationCodeInput.label')}
                                type='text'
                                placeholder={invitePlaceholder}
                                required
                            >
                                <div>
                                    <Label.Node htmlFor={field.name}>
                                        {t('CreateServerDialog.FollowInvitationTab.invitationCodeInput.label')}

                                        <Label.Wildcard/>

                                        <Label.Error field={field}/>
                                    </Label.Node>

                                    <Form.Inputs.TextInput.Node/>
                                </div>
                            </Form.Inputs.TextInput.Provider>
                        )}
                    </FormApi.Field>

                    <Form.Error/>
                </DialogBlocks.Base.Content>

                <DialogBlocks.Base.Footer>
                    <Button
                        stylingPreset='lite'
                        size='medium'
                        onLeftClick={changeTab.createServerOrFollowInvitation}
                    >
                        {t('CreateServerDialog.FollowInvitationTab.goBackButton.text')}
                    </Button>

                    <FormApi.Subscribe selector={(s) => s.isSubmitting}>
                        {(isSubmitting) => (
                            <Button
                                stylingPreset='brand'
                                size='medium'
                                type='submit'
                                isLoading={isSubmitting}
                            >
                                {t('CreateServerDialog.FollowInvitationTab.joinServerButton.text')}
                            </Button>
                        )}
                    </FormApi.Subscribe>
                </DialogBlocks.Base.Footer>
            </Form.Node>
        </Form.Provider>
    );
};