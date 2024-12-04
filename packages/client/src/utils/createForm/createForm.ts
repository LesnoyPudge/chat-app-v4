import { T } from '@lesnoypudge/types-utils-base/namespace';
import { FormOptions, formOptions } from '@tanstack/react-form';
import { valibotValidator } from '@tanstack/valibot-form-adapter';
import { GenericSchema } from 'valibot';



type Options<_Shape extends T.UnknownRecord> = (
    FormOptions<_Shape, ReturnType<typeof valibotValidator>>
    & {
        validator?: GenericSchema<_Shape>;
    }
);

export const createForm = <
    _Shape extends T.UnknownRecord,
>(
    {
        validator,
        ...options
    }: Options<_Shape>,
) => {
    return formOptions({
        validators: validator ? {
            onBlur: validator,
            onChange: validator,
            onSubmit: validator,
        } : undefined,
        ...options,
        validatorAdapter: valibotValidator(),
    });
};