import { FC } from 'react';
import { Form, MessageEditor, RTE } from '@/components';
import { Store } from '@/features';
import { useTrans } from '@/hooks';



const { SendMessageForm } = Form.createForm<MessageEditor.Types.Values>({
    defaultValues: {
        content: RTE.Modules.Utils.createInitialValue(),
        attachments: [],
    },
}).withName('SendMessage');

export namespace MessageEditorSendMessageInput {
    export type Props = {
        textChatId: string;
    };
}

export const MessageEditorSendMessageInput: FC<
    MessageEditorSendMessageInput.Props
> = ({
    textChatId,
}) => {
    const { t } = useTrans();

    const [sendMessageTrigger] = Store.Messages.Api.useMessageSendMutation();

    const { form } = Form.useExtendForm(SendMessageForm, {
        trigger: (data) => {
            return sendMessageTrigger({
                textChatId,
                attachments: data.attachments ?? [],
                content: JSON.stringify(data.content),
            });
        },
    });

    return (
        <MessageEditor.Provider
            form={form}
            submitButtonLabel={t('MessageEditor.SendMessageInput.submitButton.label')}
            attachmentsName={SendMessageForm.names.attachments}
            contentLabel={t('MessageEditor.SendMessageInput.content.label')}
            contentName={SendMessageForm.names.content}
        >
            <Form.Node>
                <MessageEditor.Wrapper>
                    <MessageEditor.Scroll>
                        <MessageEditor.Attachments/>

                        <MessageEditor.ControlsWrapper>
                            <MessageEditor.AddAttachmentsButton/>

                            <MessageEditor.Editable/>

                            <MessageEditor.EmojiPickerButton/>

                            <MessageEditor.SubmitButton/>
                        </MessageEditor.ControlsWrapper>
                    </MessageEditor.Scroll>
                </MessageEditor.Wrapper>
            </Form.Node>
        </MessageEditor.Provider>
    );
};