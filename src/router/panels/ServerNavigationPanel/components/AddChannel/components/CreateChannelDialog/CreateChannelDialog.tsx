import { Button, DialogBlocks, Form, Inputs } from '@/components';
import { useTrans } from '@/hooks';
import { Valibot } from '@/libs';
import { createWithDecorator } from '@lesnoypudge/utils-react';
import { sharedValidators } from '@/fakeShared';
import { Store } from '@/features';
import { createStyles } from '@/utils';



const styles = createStyles({
    title: 'self-start text-20-24',
});

const { CreateChannelForm } = Form.createForm({
    defaultValues: {
        name: '',
    },
    validator: Valibot.object({
        name: sharedValidators.commonString,
    }),
}).withName('CreateChannel');

const { withDecorator } = createWithDecorator<
    DialogBlocks.Types.PublicProps
>(({ children, controls }) => {
    const { t } = useTrans();

    return (
        <DialogBlocks.Base.Provider
            label={t('CreateChannelDialog.label')}
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

export const CreateChannelDialog = withDecorator<Props>(({
    serverId,
}) => {
    const { t } = useTrans();
    const { closeOverlay } = DialogBlocks.useContextProxy();

    const [
        createChannelTrigger,
    ] = Store.Channels.Api.useChannelCreateMutation();

    const { form } = Form.useExtendForm(CreateChannelForm, {
        trigger: ({ name }) => createChannelTrigger({ name, serverId }),
        onSubmitSuccessMounted: closeOverlay,
    });

    return (
        <CreateChannelForm.Provider form={form}>
            <Form.Node contents>
                <DialogBlocks.Base.Inner>
                    <DialogBlocks.Base.Header>
                        <DialogBlocks.Base.Title className={styles.title}>
                            {t('CreateChannelDialog.title')}
                        </DialogBlocks.Base.Title>
                    </DialogBlocks.Base.Header>

                    <DialogBlocks.Base.Content>
                        <Inputs.TextInput.Provider
                            label={t('CreateChannelDialog.nameField.label')}
                            name={CreateChannelForm.names.name}
                            placeholder={t('CreateChannelDialog.nameField.placeholder')}
                            required
                        >
                            <Form.Label>
                                {t('CreateChannelDialog.nameField.label')}
                            </Form.Label>

                            <Inputs.TextInput.Wrapper>
                                <Inputs.TextInput.Node/>
                            </Inputs.TextInput.Wrapper>
                        </Inputs.TextInput.Provider>

                        <Form.Error/>
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
                            {t('CreateChannelDialog.submitButton.text')}
                        </Form.SubmitButton>
                    </DialogBlocks.Base.Footer>
                </DialogBlocks.Base.Inner>
            </Form.Node>
        </CreateChannelForm.Provider>
    );
});