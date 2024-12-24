import { Button, Form, Label, Sprite } from '@components';
import { ApiValidators, Endpoints } from '@fakeShared';
import { useContextProxy, useMountedWrapper } from '@lesnoypudge/utils-react';
import { FC } from 'react';
import { CreateServerTabContext } from '../../CreateServerModal';
import { Features } from '@redux/features';
import { Modal, Navigator } from '@entities';
import { useTrans } from '@i18n';



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

    return (
        <Form.Provider formApi={FormApi} submitError={submitError}>
            <Form.Node>
                <Modal.Base.Header>
                    <Modal.Base.Title>
                        <>Персонализируйте свой канал</>
                    </Modal.Base.Title>

                    <Modal.Base.Subtitle>
                        <>Персонализируйте свой новый канал, выбрав ему название и значок. </>
                        <>Их можно будет изменить в любой момент.</>
                    </Modal.Base.Subtitle>
                </Modal.Base.Header>

                <Modal.Base.Content>
                    <FormApi.Field name='avatar'>
                        {(field) => (
                            <Label.Node htmlFor={field.name}>
                                <Form.Inputs.FileInput.Node
                                    accept='image/*'
                                    amountLimit={1}
                                    field={field}
                                    label=''
                                >

                                </Form.Inputs.FileInput.Node>
                            </Label.Node>
                        )}
                    </FormApi.Field>

                    <FormikFileInput
                        name='avatar'
                        label='Загрузить значок канала'
                        options={{
                            accept: MIME.IMAGES,
                            amountLimit: 1,
                            sizeLimit: MBToBytes(1),
                        }}
                    >
                        {({ value, fileInputProps }) => (
                            <FileInput
                                className='self-center rounded-full'
                                {...fileInputProps}
                            >
                                <div className='pointer-events-none flex h-20 w-20 rounded-full bg-primary-300'>
                                    <If condition={!!value}>
                                        <Image
                                            className='rounded-full'
                                            src={value?.base64}
                                            alt='Значок канала'
                                        />
                                    </If>

                                    <If condition={!value}>
                                        <div className='relative flex h-full w-full rounded-full border-2 border-dashed border-icon-100'>
                                            <span className='text-2xs m-auto font-semibold uppercase'>
                                                <>Загрузить</>
                                            </span>

                                            <div className='absolute right-0 top-0 h-6 w-6 rounded-full bg-brand p-1.5'>
                                                <Sprite
                                                    className='h-full w-full fill-white'
                                                    name='PLUS_ICON'
                                                />
                                            </div>
                                        </div>
                                    </If>
                                </div>
                            </FileInput>
                        )}
                    </FormikFileInput>

                    <FormApi.Field name='identifier'>
                        {(field) => (
                            <Form.Inputs.TextInput.Provider
                                field={field}
                                label='Идентификатор сервера'
                                type='text'
                                maxLength={32}
                                required
                                placeholder='myServer'
                            >
                                <div className='mt-6'>
                                    <Label.Node htmlFor={field.name}>
                                        <>Идентификатор сервера</>

                                        <Label.Wildcard/>

                                        <Label.Error field={field}/>
                                    </Label.Node>

                                    <Form.Inputs.TextInput.Node/>
                                </div>
                            </Form.Inputs.TextInput.Provider>
                        )}
                    </FormApi.Field>

                    <FormApi.Field name='name'>
                        {(field) => (
                            <Form.Inputs.TextInput.Provider
                                field={field}
                                label='Название сервера'
                                type='text'
                                maxLength={32}
                                required
                                placeholder='Мой новый сервер'
                            >
                                <div className='mt-4'>
                                    <Label.Node htmlFor={field.name}>
                                        <>Название сервера</>

                                        <Label.Wildcard/>

                                        <Label.Error field={field}/>
                                    </Label.Node>

                                    <Form.Inputs.TextInput.Node/>
                                </div>
                            </Form.Inputs.TextInput.Provider>
                        )}
                    </FormApi.Field>

                    <Form.Error className='mt-4'/>
                </Modal.Base.Content>

                <Modal.Base.Footer>
                    <Button
                        stylingPreset='lite'
                        size='medium'
                        onLeftClick={changeTab.createServerOrFollowInvitation}
                    >
                        <>Назад</>
                    </Button>

                    <FormApi.Subscribe selector={(s) => s.isSubmitting}>
                        {(isSubmitting) => (
                            <Button
                                stylingPreset='brand'
                                size='medium'
                                type='submit'
                                isLoading={isSubmitting}
                            >
                                <>Создать</>
                            </Button>
                        )}
                    </FormApi.Subscribe>
                </Modal.Base.Footer>
            </Form.Node>
        </Form.Provider>
    );
};