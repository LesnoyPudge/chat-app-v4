import { t } from '@/features';
import { FormTypes } from '../../types';
import { HTTP_STATUS_CODES } from '@lesnoypudge/utils';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { useIsMounted } from '@lesnoypudge/utils-react';
import { useState } from 'react';
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
        onSubmit: options.validator ?? createdForm.options.validator,
        onChange: options.validator ?? createdForm.options.validator,
        ...createdForm.options.validators,
        ...options.validators,
    } satisfies Validators;

    const api = TanStackForm.useForm({
        ...createdForm.options,
        ...options,
        validators,
        onSubmit: async ({ value }) => {
            // reset error on submit attempt
            setSubmitError(null);

            const response = await options.trigger(value);
            const _et = Object.assign(
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
                    const errorMessage = _et[errorName].toString();

                    setSubmitError(errorMessage);
                    return;
                }

                const internalError = _et.INTERNAL_SERVER_ERROR.toString();

                setSubmitError(internalError);
                return;
            }

            // ignore unmounted error
            if (response.error) return;

            options?.onSubmitSuccess?.(response.data);

            if (!getIsMounted()) return;

            options?.onSubmitSuccessMounted?.(response.data);
        },
    });

    return {
        form: {
            name: createdForm.name,
            submitError,
            api,
        },
    };
};