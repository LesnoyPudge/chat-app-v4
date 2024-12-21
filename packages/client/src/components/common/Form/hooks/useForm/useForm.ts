import {
    useForm as _useForm,
    FormOptions,
    ReactFormExtendedApi,
    Validator,
} from '@tanstack/react-form';
import { UntypedFormContext } from '../../context';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { useState } from 'react';



type Options<
    _Shape extends T.UnknownRecord,
    _Validator extends Validator<_Shape> | undefined = undefined,
> = (
    T.Except<FormOptions<_Shape, _Validator>, 'onSubmit'>
    & {
        onSubmit: (...args: Parameters<
            NonNullable<FormOptions<_Shape, _Validator>['onSubmit']>
        >) => Promise<string | null>;
    }
);

type Return<
    _Shape extends T.UnknownRecord,
    _Validator extends Validator<_Shape> | undefined = undefined,
> = (
    Pick<UntypedFormContext<_Shape>, 'submitError'>
    & {
        FormApi: ReactFormExtendedApi<_Shape, _Validator>;
    }
);

export const useForm = <
    _Shape extends T.UnknownRecord,
    _Validator extends Validator<_Shape> | undefined = undefined,
>(
    options: Options<_Shape, _Validator>,
): Return<_Shape, _Validator> => {
    const { onSubmit } = options;

    const [
        submitError,
        setSubmitError,
    ] = useState<string | null>(null);

    const FormApi = _useForm({
        ...options,
        onSubmit: async (...args) => {
            const error = await onSubmit(...args);
            setSubmitError(error);
        },
    });

    return {
        FormApi,
        submitError,
    };
};