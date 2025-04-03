import { Button, Form, Image, Label, Sprite, DialogBlocks } from '@/components';
import { ApiValidators, Endpoints } from '@/fakeShared';
import { ContextSelectable, useMountedWrapper } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { CreateServerTabContext } from '../../CreateServerDialog';
import { useTrans } from '@/hooks';
import { createStyles } from '@/utils';
import { Navigator, Store } from '@/features';
import { ASSETS } from '@/generated/ASSETS';



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
    validator: ApiValidators.ServerCreate,
});

export const CreateServerTab: FC = () => {
    const { changeTab } = ContextSelectable.useProxy(CreateServerTabContext);
    const [create] = Store.Servers.Api.useServerCreateMutation();
    const { tryNavigateToChannel } = Navigator.useTryNavigateToChannel();
    const { closeOverlay } = ContextSelectable.useProxy(DialogBlocks.Context);
    const { mounted } = useMountedWrapper();
    const { t } = useTrans();

    const { FormApi, submitError } = Form.useForm({
        ...CreateServerForm,
        onSubmit: Form.apiAdapter(create, {
            onSuccess: (server) => mounted(() => {
                closeOverlay();
                tryNavigateToChannel(server.id);
            }),
        }),
    });

    return (
        <Form.Provider formApi={FormApi} submitError={submitError}>
            <Form.Node>
                <DialogBlocks.Base.Header>
                    <DialogBlocks.Base.Title>
                        {t('CreateServerDialog.CreateServerTab.title')}
                    </DialogBlocks.Base.Title>

                    <DialogBlocks.Base.Subtitle>
                        {t('CreateServerDialog.CreateServerTab.subtitle')}
                    </DialogBlocks.Base.Subtitle>
                </DialogBlocks.Base.Header>

                <DialogBlocks.Base.Content>
                    <FormApi.Field name='avatar'>
                        {(AvatarField) => (
                            <Form.Inputs.FileInput.Node
                                className={styles.fileInputNode}
                                accept={Form.Inputs.FileInput.ACCEPTED_FILE_TYPE.IMAGES}
                                amountLimit={1}
                                field={AvatarField}
                                label={t('CreateServerDialog.CreateServerTab.fileInput.label')}
                            >
                                <div className={styles.fileInputWrapper}>
                                    <If condition={!!AvatarField.state.value}>
                                        <Image
                                            className={styles.serverAvatar}
                                            src={AvatarField.state.value?.base64}
                                            alt={t('CreateServerDialog.CreateServerTab.fileInput.serverImage.alt')}
                                        />
                                    </If>

                                    <If condition={!AvatarField.state.value}>
                                        <div className={styles.fileInputActionWrapper}>
                                            <span className={styles.fileInputActionText}>
                                                {t('CreateServerDialog.CreateServerTab.fileInput.uploadAction.text')}
                                            </span>

                                            <div className={styles.fileInputActionIconWrapper}>
                                                <Sprite
                                                    className={styles.fileInputActionIcon}
                                                    sprite={ASSETS.IMAGES.SPRITE.PLUS_ICON}
                                                />
                                            </div>
                                        </div>
                                    </If>
                                </div>
                            </Form.Inputs.FileInput.Node>
                        )}
                    </FormApi.Field>

                    <FormApi.Field name='identifier'>
                        {(IdentifierField) => (
                            <Form.Inputs.TextInput.Provider
                                field={IdentifierField}
                                label={t('CreateServerDialog.CreateServerTab.identifierField.label')}
                                type='text'
                                maxLength={32}
                                required
                                placeholder='myServer'
                            >
                                <div className={styles.identifierFieldSpacing}>
                                    <Label.Node htmlFor={IdentifierField.name}>
                                        {t('CreateServerDialog.CreateServerTab.identifierField.label')}

                                        <Label.Wildcard/>

                                        <Label.Error field={IdentifierField}/>
                                    </Label.Node>

                                    <Form.Inputs.TextInput.Node/>
                                </div>
                            </Form.Inputs.TextInput.Provider>
                        )}
                    </FormApi.Field>

                    <FormApi.Field name='name'>
                        {(NameField) => (
                            <Form.Inputs.TextInput.Provider
                                field={NameField}
                                label={t('CreateServerDialog.CreateServerTab.nameField.label')}
                                type='text'
                                maxLength={32}
                                required
                                placeholder='Мой новый сервер'
                            >
                                <div className={styles.nameFieldSpacing}>
                                    <Label.Node htmlFor={NameField.name}>
                                        {t('CreateServerDialog.CreateServerTab.nameField.label')}

                                        <Label.Wildcard/>

                                        <Label.Error field={NameField}/>
                                    </Label.Node>

                                    <Form.Inputs.TextInput.Node/>
                                </div>
                            </Form.Inputs.TextInput.Provider>
                        )}
                    </FormApi.Field>

                    <Form.Error className={styles.formErrorSpacing}/>
                </DialogBlocks.Base.Content>

                <DialogBlocks.Base.Footer>
                    <Button
                        stylingPreset='lite'
                        size='medium'
                        onLeftClick={changeTab.createServerOrFollowInvitation}
                    >
                        {t('CreateServerDialog.CreateServerTab.backButton.text')}
                    </Button>

                    <FormApi.Subscribe selector={({
                        isSubmitting,
                        isFormValid,
                    }) => ({
                        isSubmitting,
                        isFormValid,
                    })}>
                        {({ isFormValid, isSubmitting }) => (
                            <Button
                                stylingPreset='brand'
                                size='medium'
                                type='submit'
                                isDisabled={!isFormValid}
                                isLoading={isSubmitting}
                            >
                                {t('CreateServerDialog.CreateServerTab.submitButton.text')}
                            </Button>
                        )}
                    </FormApi.Subscribe>
                </DialogBlocks.Base.Footer>
            </Form.Node>
        </Form.Provider>
    );
};