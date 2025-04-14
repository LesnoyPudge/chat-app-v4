import { Form, Inputs, Overlay, RTE } from '@/components';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { PropsWithChildren } from 'react';



export namespace Types {
    export type MessageContent = RTE.Types.Nodes;

    export type MessageAttachments = (
        Inputs.FileInput.Types.ConditionalValue<number>
    );

    export type Values = {
        content: MessageContent;
        attachments: MessageAttachments;
    };

    export type Context = {
        submitButtonLabel: string;
        contentName: Form.Types.GenericNameWrapper;
        contentLabel: string;
        attachmentsName: Form.Types.GenericNameWrapper;
    };

    export namespace Provider {
        export type Props = T.Simplify<(
            PropsWithChildren
            & Context
            & {
                form: Form.Types.FormContext<Values>;
            }
        )>;
    }
}