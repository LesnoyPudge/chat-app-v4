import { Button, DialogBlocks, Form, Inputs } from '@/components';
import { Navigator, Store } from '@/features';
import { useTrans } from '@/hooks';
import { Valibot } from '@/libs';
import { createStyles } from '@/utils';
import { invariant } from '@lesnoypudge/utils';
import { createWithDecorator } from '@lesnoypudge/utils-react';
import { sharedValidators, VALIDATION_ERRORS } from '@/fakeShared';
import { Trans } from 'react-i18next';



const styles = createStyles({
    title: 'text-start text-20-24',
});

const { DeleteServerForm } = Form.createForm({
    defaultValues: {
        name: '',
    },
}).withName('DeleteServer');

const { withDecorator } = createWithDecorator<
    DialogBlocks.Types.PublicProps
>(({ children, controls }) => {
    const { t } = useTrans();

    return (
        <DialogBlocks.Base.Provider
            label={t('DeleteServerDialog.label')}
            controls={controls}
        >
            <DialogBlocks.Base.Wrapper>
                {children}
            </DialogBlocks.Base.Wrapper>
        </DialogBlocks.Base.Provider>
    );
});

type Props = {
    serverId: string;
};

export const DeleteServerDialog = withDecorator<Props>(({
    serverId,
}) => {
    const { t } = useTrans();
    const { navigateTo } = Navigator.useNavigateTo();
    const { closeOverlay } = DialogBlocks.useContextProxy();

    const [
        deleteServerTrigger,
    ] = Store.Servers.Api.useServerDeleteMutation();

    const serverName = Store.useSelector(
        Store.Servers.Selectors.selectNameById(serverId),
    );
    invariant(serverName);

    const { form } = Form.useExtendForm(DeleteServerForm, {
        trigger: () => deleteServerTrigger({ serverId }),
        onSubmitSuccessMounted: () => {
            closeOverlay();
            navigateTo.root();
        },
        validator: Valibot.object({
            name: Valibot.pipe(
                sharedValidators.singleCommonString,
                Valibot.check((name) => {
                    return name === serverName;
                }, VALIDATION_ERRORS.BAD_VALUE),
            ),
        }),
    });

    return (
        <DeleteServerForm.Provider form={form}>
            <DialogBlocks.Base.Inner>
                <Form.Node contents>
                    <DialogBlocks.Base.Header>
                        <DialogBlocks.Base.Title className={styles.title}>
                            {t('DeleteServerDialog.title', {
                                serverName,
                            })}
                        </DialogBlocks.Base.Title>
                    </DialogBlocks.Base.Header>

                    <DialogBlocks.Base.Content className='gap-4'>
                        <p>
                            <Trans
                                i18nKey='DeleteServerDialog.warning'
                                values={{ serverName }}
                                components={{
                                    strong: <strong/>,
                                    br: <br/>,
                                }}
                            />
                        </p>

                        <Inputs.TextInput.Provider
                            label={t('DeleteServerDialog.serverNameField.label')}
                            name={DeleteServerForm.names.name}
                            required
                        >
                            <div>
                                <Form.Label>
                                    {t('DeleteServerDialog.serverNameField.label')}
                                </Form.Label>

                                <Inputs.TextInput.Wrapper>
                                    <Inputs.TextInput.Node/>
                                </Inputs.TextInput.Wrapper>
                            </div>
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
                            stylingPreset='brandDanger'
                            size='medium'
                        >
                            {t('DeleteServerDialog.submitButton.text')}
                        </Form.SubmitButton>
                    </DialogBlocks.Base.Footer>
                </Form.Node>
            </DialogBlocks.Base.Inner>
        </DeleteServerForm.Provider>
    );
});