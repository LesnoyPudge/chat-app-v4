import { t } from '@i18n';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { defaults, STATUS_CODE } from '@lesnoypudge/utils';
import { CustomQueryFn } from '@redux/utils';
import { TypedMutationTrigger } from '@reduxjs/toolkit/query/react';
import { FormApi } from '@tanstack/react-form';



type OnSubmitProps<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _ApiTrigger extends TypedMutationTrigger<any, any, CustomQueryFn>,
> = {
    value: Parameters<_ApiTrigger>[0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formApi: FormApi<Parameters<_ApiTrigger>[0], any>;
};

type StatusCode = T.Except<typeof STATUS_CODE, 'OK'>;

type ErrorCodes = T.RequiredKeysOf<StatusCode>;

type ErrorTable = Record<ErrorCodes, string>;

type Options<_Result> = {
    errorTable?: Partial<ErrorTable>;
    onSuccess?: (value: _Result) => void;
};

const defaultErrorTable = {
    BAD_REQUEST: t('ApiError.BAD_REQUEST'),
    FORBIDDEN: t('ApiError.FORBIDDEN'),
    INTERNAL_SERVER_ERROR: t('ApiError.INTERNAL_SERVER_ERROR'),
    NOT_FOUND: t('ApiError.NOT_FOUND'),
    UNAUTHORIZED: t('ApiError.UNAUTHORIZED'),
} satisfies ErrorTable;

const codeToName = {
    [STATUS_CODE.BAD_REQUEST]: 'BAD_REQUEST',
    [STATUS_CODE.FORBIDDEN]: 'FORBIDDEN',
    [STATUS_CODE.INTERNAL_SERVER_ERROR]: 'INTERNAL_SERVER_ERROR',
    [STATUS_CODE.NOT_FOUND]: 'NOT_FOUND',
    [STATUS_CODE.UNAUTHORIZED]: 'UNAUTHORIZED',
} satisfies Record<
    T.ValueOf<StatusCode>,
    ErrorCodes
>;

export const apiAdapter = <
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _ApiTrigger extends TypedMutationTrigger<any, any, CustomQueryFn>,
    _Result = _ApiTrigger extends TypedMutationTrigger<
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        infer _Value, any, CustomQueryFn
    > ? _Value : never,
>(
    apiFn: _ApiTrigger,
    options?: Options<_Result>,
) => {
    const _errorTable = defaults(options?.errorTable ?? {}, defaultErrorTable);

    return async ({
        value,
    }: OnSubmitProps<_ApiTrigger>): Promise<string | null> => {
        const response = await apiFn(value);

        if (
            response.error
            && 'status' in response.error
            && typeof response.error.status === 'number'
        ) {
            return _errorTable[codeToName[response.error.status]];
        }

        if (response.error) {
            return _errorTable.INTERNAL_SERVER_ERROR;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        options?.onSuccess?.(response.data);

        return null;
    };
};