import { Button, Form, Image, Label, Sprite } from '@components';
import { ApiValidators, Endpoints } from '@fakeShared';
import { useContextProxy, useMountedWrapper } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { CreateServerTabContext } from '../../CreateServerModal';
import { Features } from '@redux/features';
import { Modal, Navigator } from '@entities';
import { useTrans } from '@i18n';
import { createStyles } from '@utils';



const styles = createStyles({
    fileInputNode: 'self-center rounded-full',
    fileInputWrapper: `
        pointer-events-none 
        flex 
        h-20 
        w-20 
        rounded-full 
        bg-primary-300
    `,
    serverAvatar: 'rounded-full',
    fileInputActionWrapper: `
        relative 
        flex 
        h-full 
        w-full 
        rounded-full 
        border-2 
        border-dashed 
        border-icon-100
    `,
    fileInputActionText: `
        m-auto
        text-10-12 
        font-semibold 
        uppercase
    `,
    fileInputActionIconWrapper: `
        absolute 
        right-0 
        top-0 
        h-6 
        w-6 
        rounded-full 
        bg-brand 
        p-1.5
    `,
    fileInputActionIcon: 'h-full w-full fill-white',
    identifierFieldSpacing: 'mt-6',
    nameFieldSpacing: 'mt-4',
    formErrorSpacing: 'mt-4',
});

type CreateServerFormValues = Endpoints.V1.Server.Create.RequestBody;

const CreateServerForm = Form.createForm<CreateServerFormValues>({
    defaultValues: {
        identifier: '',
        name: '',
        avatar: null,
    },
    validator: ApiValidators.V1.Server.create,
});

export const CreateServerTab: FC = () => {
    const { changeTab } = useContextProxy(CreateServerTabContext);
    const [create] = Features.Servers.Api.useCreateMutation();
    const { navigateTo } = Navigator.useNavigator();
    const { closeOverlay } = useContextProxy(Modal.Context);
    const { mounted } = useMountedWrapper();
    const { t } = useTrans();

    const { FormApi, submitError } = Form.useForm({
        ...CreateServerForm,
        onSubmit: Form.apiAdapter(create, {
            onSuccess: (server) => mounted(() => {
                closeOverlay();
                void navigateTo.server({ serverId: server.id });
            }),
        }),
    });

    const { AvatarField } = Form.useField(FormApi, 'avatar');
    const { IdentifierField } = Form.useField(FormApi, 'identifier');
    const { NameField } = Form.useField(FormApi, 'name');

    return (
        <Form.Provider formApi={FormApi} submitError={submitError}>
            <Form.Node>
                <Modal.Base.Header>
                    <Modal.Base.Title>
                        {t('CreateServerModal.CreateServerTab.title')}
                    </Modal.Base.Title>

                    <Modal.Base.Subtitle>
                        {t('CreateServerModal.CreateServerTab.subtitle')}
                    </Modal.Base.Subtitle>
                </Modal.Base.Header>

                <Modal.Base.Content>
                    <Form.Inputs.FileInput.Node
                        className={styles.fileInputNode}
                        accept='image/*'
                        amountLimit={1}
                        field={AvatarField}
                        label={t('CreateServerModal.CreateServerTab.fileInput.label')}
                    >
                        <div className={styles.fileInputWrapper}>
                            <If condition={!!AvatarField.state.value}>
                                <Image
                                    className={styles.serverAvatar}
                                    src={AvatarField.state.value?.base64}
                                    alt={t('CreateServerModal.CreateServerTab.fileInput.serverImage.alt')}
                                />
                            </If>

                            <If condition={!AvatarField.state.value}>
                                <div className={styles.fileInputActionWrapper}>
                                    <span className={styles.fileInputActionText}>
                                        {t('CreateServerModal.CreateServerTab.fileInput.uploadAction.text')}
                                    </span>

                                    <div className={styles.fileInputActionIconWrapper}>
                                        <Sprite
                                            className={styles.fileInputActionIcon}
                                            name='PLUS_ICON'
                                        />
                                    </div>
                                </div>
                            </If>
                        </div>
                    </Form.Inputs.FileInput.Node>

                    <Form.Inputs.TextInput.Provider
                        field={IdentifierField}
                        label={t('CreateServerModal.CreateServerTab.identifierField.label')}
                        type='text'
                        maxLength={32}
                        required
                        placeholder='myServer'
                    >
                        <div className={styles.identifierFieldSpacing}>
                            <Label.Node htmlFor={IdentifierField.name}>
                                {t('CreateServerModal.CreateServerTab.identifierField.label')}

                                <Label.Wildcard/>

                                <Label.Error field={IdentifierField}/>
                            </Label.Node>

                            <Form.Inputs.TextInput.Node/>
                        </div>
                    </Form.Inputs.TextInput.Provider>

                    <Form.Inputs.TextInput.Provider
                        field={NameField}
                        label={t('CreateServerModal.CreateServerTab.nameField.label')}
                        type='text'
                        maxLength={32}
                        required
                        placeholder='Мой новый сервер'
                    >
                        <div className={styles.nameFieldSpacing}>
                            <Label.Node htmlFor={NameField.name}>
                                {t('CreateServerModal.CreateServerTab.nameField.label')}

                                <Label.Wildcard/>

                                <Label.Error field={NameField}/>
                            </Label.Node>

                            <Form.Inputs.TextInput.Node/>
                        </div>
                    </Form.Inputs.TextInput.Provider>

                    <Form.Error className={styles.formErrorSpacing}/>
                </Modal.Base.Content>

                <Modal.Base.Footer>
                    <Button
                        stylingPreset='lite'
                        size='medium'
                        onLeftClick={changeTab.createServerOrFollowInvitation}
                    >
                        {t('CreateServerModal.CreateServerTab.backButton.text')}
                    </Button>

                    <FormApi.Subscribe selector={(s) => s.isSubmitting}>
                        {(isSubmitting) => (
                            <Button
                                stylingPreset='brand'
                                size='medium'
                                type='submit'
                                isLoading={isSubmitting}
                            >
                                {t('CreateServerModal.CreateServerTab.submitButton.text')}
                            </Button>
                        )}
                    </FormApi.Subscribe>
                </Modal.Base.Footer>
            </Form.Node>
        </Form.Provider>
    );
};