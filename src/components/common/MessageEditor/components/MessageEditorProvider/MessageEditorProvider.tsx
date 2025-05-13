import { Form, RTE } from '@/components';
import { MessageEditorContext } from '../../context';
import { FC } from 'react';
import { Types } from '../../types';
import { useTrans } from '@/hooks';
import { createWithDecorator, useFunction } from '@lesnoypudge/utils-react';



type DecoratorProps = Pick<Types.Provider.Props, 'form'>;

const { withDecorator } = createWithDecorator<DecoratorProps>(({
    form,
    children,
}) => {
    return (
        <Form.Provider form={form}>
            {children}
        </Form.Provider>
    );
});

export const MessageEditorProvider: FC<Types.Provider.Props> = withDecorator(({
    children,
    attachmentsName = { _: '' },
    submitButtonLabel = '',
    contentLabel,
    contentName,
    onKeyDown,
    form: _,
}) => {
    const { t } = useTrans();
    const fieldApi = Form.useFieldApi<Types.MessageContent>(contentName);
    const content = Form.useFieldValue(fieldApi);
    const isSubmitting = Form.useFormStore((v) => v.isSubmitting);
    const { api } = Form.useFormContext();
    const field = Form.useFieldApi(contentName);

    const handleSubmit = useFunction(() => {
        void api.handleSubmit();
    });

    const value: Types.Context = {
        attachmentsName,
        contentLabel,
        contentName,
        submitButtonLabel,
    };

    return (
        <RTE.Provider
            label={contentLabel}
            name={contentName._}
            placeholder={t('MessageEditor.Provider.placeholder')}
            value={content}
            maxLength={2_000}
            disabled={isSubmitting}
            onChange={field.setValue}
            onSubmit={handleSubmit}
            onBlur={field.handleBlur}
            onKeyDown={onKeyDown}
        >
            <MessageEditorContext.Provider value={value}>
                {children}
            </MessageEditorContext.Provider>
        </RTE.Provider>
    );
});