import { Form, Overlay, RTE } from '@/components';
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
    ...rest
}) => {
    const { t } = useTrans();
    const content = Form.useFieldValue<Types.MessageContent>(rest.contentName);
    const isSubmitting = Form.useFormStore((v) => v.isSubmitting);
    const { api } = Form.useFormContext();
    const { setValue } = Form.useFieldApi(rest.contentName);

    const handleSubmit = useFunction(() => {
        void api.handleSubmit();
    });

    const value: Types.Context = rest;

    return (
        <RTE.Provider
            label={rest.contentLabel}
            name={rest.contentName._}
            placeholder={t('MessageEditor.Provider.placeholder')}
            value={content}
            maxLength={2_000}
            disabled={isSubmitting}
            onChange={setValue}
            onSubmit={handleSubmit}
        >
            <MessageEditorContext.Provider value={value}>
                {children}
            </MessageEditorContext.Provider>
        </RTE.Provider>
    );
});