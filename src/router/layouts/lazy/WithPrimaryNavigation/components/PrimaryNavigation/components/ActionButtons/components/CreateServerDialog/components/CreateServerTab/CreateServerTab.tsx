import {
    Button,
    Form,
    Image,
    Sprite,
    DialogBlocks,
    Inputs,
} from '@/components';
import { ApiValidators, Endpoints } from '@/fakeShared';
import { FC } from 'react';
import { CreateServerTabs } from '../../CreateServerDialog';
import { useTrans } from '@/hooks';
import { createStyles } from '@/utils';
import { Navigator, Store } from '@/features';
import { ASSETS } from '@/generated/ASSETS';
import { ACCEPTED_FILE_TYPE } from '@/vars';



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

const {
    CreateServerForm,
} = Form.createForm<Endpoints.V1.Server.Create.RequestBody>({
    defaultValues: {
        identifier: '',
        name: '',
        avatar: null,
    },
    validator: ApiValidators.ServerCreate,
}).withName('CreateServer');

export const CreateServerTab: FC = () => {
    const { changeTab } = CreateServerTabs.useProxy();
    const [create] = Store.Servers.Api.useServerCreateMutation();
    const { tryNavigateToChannel } = Navigator.useTryNavigateToChannel();
    const { closeOverlay } = DialogBlocks.useContextProxy();
    const { t } = useTrans();

    const { form } = Form.useExtendForm(CreateServerForm, {
        trigger: create,
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
                        {t('CreateServerDialog.CreateServerTab.title')}
                    </DialogBlocks.Base.Title>

                    <DialogBlocks.Base.Subtitle>
                        {t('CreateServerDialog.CreateServerTab.subtitle')}
                    </DialogBlocks.Base.Subtitle>
                </DialogBlocks.Base.Header>

                <DialogBlocks.Base.Content>
                    <Inputs.FileInput.Provider
                        name={CreateServerForm.names.avatar}
                        accept={ACCEPTED_FILE_TYPE.IMAGES}
                        amountLimit={1}
                        label={t('CreateServerDialog.CreateServerTab.fileInput.label')}
                    >
                        {({ value }) => (
                            <Inputs.FileInput.Node className={styles.fileInputNode}>
                                <div className={styles.fileInputWrapper}>
                                    <If condition={!!value}>
                                        <Image
                                            className={styles.serverAvatar}
                                            src={value?.base64}
                                            alt={t('CreateServerDialog.CreateServerTab.fileInput.serverImage.alt')}
                                        />
                                    </If>

                                    <If condition={!value}>
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
                            </Inputs.FileInput.Node>
                        )}
                    </Inputs.FileInput.Provider>

                    <Inputs.TextInput.Provider
                        name={CreateServerForm.names.identifier}
                        label={t('CreateServerDialog.CreateServerTab.identifierField.label')}
                        required
                        placeholder='myServer'
                    >
                        <div className={styles.identifierFieldSpacing}>
                            <Form.Label>
                                {t('CreateServerDialog.CreateServerTab.identifierField.label')}
                            </Form.Label>

                            <Inputs.TextInput.Node/>
                        </div>
                    </Inputs.TextInput.Provider>

                    <Inputs.TextInput.Provider
                        name={CreateServerForm.names.name}
                        label={t('CreateServerDialog.CreateServerTab.nameField.label')}
                        required
                        placeholder='My server`s name'
                    >
                        <div className={styles.identifierFieldSpacing}>
                            <Form.Label>
                                {t('CreateServerDialog.CreateServerTab.nameField.label')}
                            </Form.Label>

                            <Inputs.TextInput.Node/>
                        </div>
                    </Inputs.TextInput.Provider>

                    <Form.Error className={styles.formErrorSpacing}/>
                </DialogBlocks.Base.Content>

                <DialogBlocks.Base.Footer>
                    <Button
                        stylingPreset='lite'
                        size='medium'
                        onLeftClick={changeTab.CreateServerOrFollowInvitation}
                    >
                        {t('CreateServerDialog.CreateServerTab.backButton.text')}
                    </Button>

                    <Form.SubmitButton
                        stylingPreset='brand'
                        size='medium'
                    >
                        {t('CreateServerDialog.CreateServerTab.submitButton.text')}
                    </Form.SubmitButton>
                </DialogBlocks.Base.Footer>
            </Form.Node>
        </Form.Provider>
    );
};