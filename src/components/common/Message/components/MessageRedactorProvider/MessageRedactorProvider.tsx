import { FC, PropsWithChildren, useState } from 'react';
import { Types } from '../../types';
import { useFunction } from '@lesnoypudge/utils-react';
import { Store } from '@/features';
import { invariant } from '@lesnoypudge/utils';
import { Form } from '@/components';
import { MessageRedactorContext } from '../../context';



const {
    MessageRedactorForm,
} = Form.createForm<Types.MessageRedactorFormValues>({
    defaultValues: {
        content: [],
    },
}).withName('MessageRedactor');

export const MessageRedactorProvider: FC<PropsWithChildren> = ({
    children,
}) => {
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
    ) = setActiveMessageId;

    const closeRedactor: (
        Types.RedactorContext['closeRedactor']
    ) = useFunction(() => setActiveMessageId(null));

    const getIsRedactorActive: (
        Types.RedactorContext['getIsRedactorActive']
    ) = useFunction((id) => {
        return id === activeMessageId;
    });

    const value: Types.RedactorContext = {
        getIsRedactorActive,
        activeMessageId,
        closeRedactor,
        openRedactor,
    };

    return (
        <Form.Provider form={form}>
            <MessageRedactorContext.Provider value={value}>
                {children}
            </MessageRedactorContext.Provider>
        </Form.Provider>
    );
};