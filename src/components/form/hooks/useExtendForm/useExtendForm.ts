import { t } from '@/features';
import { FormTypes } from '../../types';
import { deepEqual, HTTP_STATUS_CODES, noop } from '@lesnoypudge/utils';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { mutate, useFunction, useIsMounted } from '@lesnoypudge/utils-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { TanStackForm } from '@/libs';



const defaultErrorTable = {
    BAD_REQUEST: t('ApiError.BAD_REQUEST'),
    FORBIDDEN: t('ApiError.FORBIDDEN'),
    INTERNAL_SERVER_ERROR: t('ApiError.INTERNAL_SERVER_ERROR'),
    NOT_FOUND: t('ApiError.NOT_FOUND'),
    UNAUTHORIZED: t('ApiError.UNAUTHORIZED'),
} satisfies FormTypes.ErrorTable;

const codeToName = {
    [HTTP_STATUS_CODES.BAD_REQUEST]: 'BAD_REQUEST',
    [HTTP_STATUS_CODES.FORBIDDEN]: 'FORBIDDEN',
    [HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR]: 'INTERNAL_SERVER_ERROR',
    [HTTP_STATUS_CODES.NOT_FOUND]: 'NOT_FOUND',
    [HTTP_STATUS_CODES.UNAUTHORIZED]: 'UNAUTHORIZED',
} satisfies Record<
    T.ValueOf<FormTypes.StatusCode>,
    FormTypes.ErrorCodes
>;

export const useExtendForm: FormTypes.useExtendForm.Fn = (
    createdForm,
    options,
) => {
    const { getIsMounted } = useIsMounted();
    const [
        submitError,
        setSubmitError,
    ] = useState<FormTypes.FormContext['submitError']>(null);

    type Validators = NonNullable<typeof options.validators>;

    const validators = {
        onSubmitAsync: options.validator ?? createdForm.options.validator,
        onChangeAsync: options.validator ?? createdForm.options.validator,
        ...createdForm.options.validators,
        ...options.validators,
    } satisfies Validators;

    const api = TanStackForm.useForm({
        ...createdForm.options,
        ...options,
        validators,
        onSubmit: async ({ value, formApi }) => {
            // reset error on submit attempt
            setSubmitError(null);

            const response = await options.trigger(value);
            const _errorTable = Object.assign(
                defaultErrorTable,
                options?.errorTable,
            );

            // update error while mounted
            if (getIsMounted() && response.error) {
                if (
                    'status' in response.error
                    && typeof response.error.status === 'number'
                ) {
                    const errorName = codeToName[response.error.status];
                    const errorMessage = _errorTable[errorName].toString();

                    setSubmitError(errorMessage);
                    return;
                }

                const internalError = (
                    _errorTable.INTERNAL_SERVER_ERROR.toString()
                );

                setSubmitError(internalError);
                return;
            }

            // ignore unmounted error
            if (response.error) return;

            // const { defaultValues } = options;
            // invariant(defaultValues);
            // console.log('reset to', value);
            // formApi.reset(value);

            options?.onSubmitSuccess?.(response.data, formApi);

            if (!getIsMounted()) return;

            options?.onSubmitSuccessMounted?.(response.data, formApi);
        },
    });

    const onReset = useFunction(options.onReset ?? noop);

    // patch reset trigger once
    useMemo(() => {
        const original = api.reset;

        mutate(api, 'reset', (...args) => {
            original(...args);
            onReset();
        });
    }, [api, onReset]);


    const prevDefaultValuesRef = useRef<T.UnknownRecord>();

    useEffect(() => {
        const defaultValues = options.defaultValues;
        if (!defaultValues) return;

        if (prevDefaultValuesRef.current === undefined) {
            prevDefaultValuesRef.current = defaultValues;
            return;
        }

        if (deepEqual(prevDefaultValuesRef.current, defaultValues)) return;

        prevDefaultValuesRef.current = defaultValues;

        api.reset(defaultValues);
    }, [api, options.defaultValues]);

    return {
        form: {
            name: createdForm.name,
            submitError,
            api,
        },
    };
};