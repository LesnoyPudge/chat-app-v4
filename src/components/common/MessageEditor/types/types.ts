import { Form } from '@/components';



export namespace Types {
    export type Context = {
        textAreaPlaceholder: string;
        textAreaLabel: string;
        isSubmitting: boolean;
        submit: VoidFunction;
        submitButtonLabel: string;
        attachmentsControls: Pick<
            Form.Inputs.FileInput.Node.Props<number>,
            'field'
            | 'accept'
            | 'amountLimit'
            | 'label'
            | 'onAmountLimit'
            | 'onSizeLimit'
        >;
    };
}