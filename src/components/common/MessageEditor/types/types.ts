import { Form, Inputs, Overlay } from '@/components';



export namespace Types {
    export type Context = (
        {
            textAreaPlaceholder: string;
            textAreaLabel: string;
            isSubmitting: boolean;
            submit: VoidFunction;
            submitButtonLabel: string;
            attachmentsValue?: (
                Inputs.FileInput.Types.Context<number>['value']
            );
            attachmentsAmountLimitControls: Overlay.Types.Controls;
            attachmentsSizeLimitIsControls: Overlay.Types.Controls;
            attachmentsSetValue?: (
                Inputs.FileInput.Types.Context<number>['setValue']
            );
            attachmentsName?: Form.Types.GenericNameWrapper;
        }
    );
}