import { Button, Form, DialogBlocks, Inputs } from '@/components';
import { ApiValidators, Endpoints } from '@/fakeShared';
import { FC } from 'react';
import { CreateServerTabs } from '../../CreateServerDialog';
import { createStyles } from '@/utils';
import { useTrans } from '@/hooks';
import { Navigator, Store } from '@/features';



const styles = createStyles({
    content: 'gap-2.5',
});

const invitePlaceholder = `hTkz9ak`;

const {
    FollowInvitationForm,
} = Form.createForm<Endpoints.V1.Server.AcceptInvitation.RequestBody>({
    defaultValues: {
        invitationCode: '',
    },
    validator: ApiValidators.ServerAcceptInvitation,
}).withName('FollowInvitation');

export const FollowInvitationTab: FC = () => {
    const { changeTab } = CreateServerTabs.useProxy();
    const { closeOverlay } = DialogBlocks.useContextProxy();
    const { tryNavigateToChannel } = Navigator.useTryNavigateToChannel();
    const [accept] = Store.Servers.Api.useServerAcceptInvitationMutation();
    const { t } = useTrans();

    const { form } = Form.useExtendForm(FollowInvitationForm, {
        trigger: accept,
        onSubmitSuccessMounted: (server) => {
            closeOverlay();
            tryNavigateToChannel(server.id);
        },
    });


    return (
        <Form.Provider form={form}>
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
                    <Inputs.TextInput.Provider
                        name={FollowInvitationForm.names.invitationCode}
                        label={t('CreateServerDialog.FollowInvitationTab.invitationCodeInput.label')}
                        placeholder={invitePlaceholder}
                        required
                    >
                        <div>
                            <Form.Label>
                                {t('CreateServerDialog.FollowInvitationTab.invitationCodeInput.label')}
                            </Form.Label>

                            <Inputs.TextInput.Node/>
                        </div>
                    </Inputs.TextInput.Provider>

                    <Form.Error/>
                </DialogBlocks.Base.Content>

                <DialogBlocks.Base.Footer>
                    <Button
                        stylingPreset='lite'
                        size='medium'
                        onLeftClick={changeTab.CreateServerOrFollowInvitation}
                    >
                        {t('CreateServerDialog.FollowInvitationTab.goBackButton.text')}
                    </Button>

                    <Form.SubmitButton
                        stylingPreset='brand'
                        size='medium'
                    >
                        {t('CreateServerDialog.FollowInvitationTab.joinServerButton.text')}
                    </Form.SubmitButton>
                </DialogBlocks.Base.Footer>
            </Form.Node>
        </Form.Provider>
    );
};