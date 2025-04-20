import { FC, PropsWithChildren, useState } from 'react';
import { Types } from '../../types';
import { useFunction } from '@lesnoypudge/utils-react';
import { Store } from '@/features';
import { invariant, KEY, parseJSON } from '@lesnoypudge/utils';
import { Form, MessageEditor, RTE } from '@/components';
import { MessageRedactorContext } from '../../context';
import { useTrans } from '@/hooks';
import { injectedStore } from '@/store/utils';



const {
    MessageRedactorForm,
} = Form.createForm<Types.MessageRedactorFormValues>({
    defaultValues: {
        content: RTE.Modules.Utils.createInitialValue(),
    },
}).withName('MessageRedactor');

export const MessageRedactorProvider: FC<PropsWithChildren> = ({
    children,
}) => {
    const { t } = useTrans();
    const [
        activeMessageId,
        setActiveMessageId,
    ] = useState<Types.RedactorContext['activeMessageId']>(null);

    const [messageEditTrigger] = Store.Messages.Api.useMessageEditMutation();

    const { form } = Form.useExtendForm(MessageRedactorForm, {
        trigger: ({ content }) => {
            invariant(activeMessageId);

            return messageEditTrigger({
                messageId: activeMessageId,
                content: JSON.stringify(content),
            });
        },
        onSubmitSuccessMounted: () => {
            closeRedactor();
        },
    });

    const openRedactor: (
        Types.RedactorContext['openRedactor']
    ) = useFunction((messageId) => {
        const store = injectedStore.getStore();

        const message = Store.Messages.Selectors.selectById(messageId)(
            store.getState(),
        );

        invariant(message);

        // @ts-expect-error deep types error
        form.api.setFieldValue(
            MessageRedactorForm.names.content._,
            parseJSON(message.content),
        );

        setActiveMessageId(messageId);
    });

    const closeRedactor: (
        Types.RedactorContext['closeRedactor']
    ) = useFunction(() => {
        form.api.reset();
        setActiveMessageId(null);
    });

    const handleEscape: (
        NonNullable<MessageEditor.Types.Provider.Props['onKeyDown']>
    ) = useFunction((e) => {
        if (e.key !== KEY.Escape) return false;

        e.preventDefault();

        closeRedactor();

        return true;
    });

    const value: Types.RedactorContext = {
        activeMessageId,
        closeRedactor,
        openRedactor,
    };

    return (
        <MessageEditor.Provider
            form={form}
            contentLabel={t('Message.Redactor.label')}
            contentName={MessageRedactorForm.names.content}
            onKeyDown={handleEscape}
        >
            <MessageRedactorContext.Provider value={value}>
                {children}
            </MessageRedactorContext.Provider>
        </MessageEditor.Provider>
    );
};