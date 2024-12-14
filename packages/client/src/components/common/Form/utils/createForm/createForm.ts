import { T } from '@lesnoypudge/types-utils-base/namespace';
import { FormOptions, formOptions } from '@tanstack/react-form';
import { valibotValidator } from '@tanstack/valibot-form-adapter';
import * as v from 'valibot';



export namespace createForm {
    export type Options<_Shape extends T.UnknownRecord> = (
        FormOptions<_Shape, ReturnType<typeof valibotValidator>>
        & {
            validator?: v.GenericSchema<_Shape>;
        }
    );
}

export const createForm = <
    _Shape extends T.UnknownRecord,
>({
    validator,
    ...options
}: createForm.Options<_Shape>) => {
    return formOptions({
        validators: validator ? {
            // onBlur: validator,
            onChange: validator,
            onSubmit: validator,
        } : undefined,
        ...options,
        validatorAdapter: valibotValidator(),
    });
};