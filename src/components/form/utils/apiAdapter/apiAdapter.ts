import { t } from '@/features';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { HTTP_STATUS_CODES } from '@lesnoypudge/utils';
import { CustomQueryFn } from '@/store/utils';
import { FormApi } from '@tanstack/react-form';
import { ReduxToolkitQueryReact } from '@/libs';



type OnSubmitProps<
    _ApiTrigger extends ReduxToolkitQueryReact.TypedMutationTrigger<
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        any, any, CustomQueryFn
    >,
> = {
    value: Parameters<_ApiTrigger>[0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formApi: FormApi<Parameters<_ApiTrigger>[0], any>;
};

type StatusCode = T.Except<typeof HTTP_STATUS_CODES, 'OK'>;

type ErrorCodes = T.RequiredKeysOf<StatusCode>;

type ErrorTable = Record<ErrorCodes, ReturnType<typeof t>>;

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
    [HTTP_STATUS_CODES.BAD_REQUEST]: 'BAD_REQUEST',
    [HTTP_STATUS_CODES.FORBIDDEN]: 'FORBIDDEN',
    [HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR]: 'INTERNAL_SERVER_ERROR',
    [HTTP_STATUS_CODES.NOT_FOUND]: 'NOT_FOUND',
    [HTTP_STATUS_CODES.UNAUTHORIZED]: 'UNAUTHORIZED',
} satisfies Record<
    T.ValueOf<StatusCode>,
    ErrorCodes
>;

export const apiAdapter = <
    _ApiTrigger extends ReduxToolkitQueryReact.TypedMutationTrigger<
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        any, any, CustomQueryFn
    >,
    _Result = _ApiTrigger extends ReduxToolkitQueryReact.TypedMutationTrigger<
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        infer _Value, any, CustomQueryFn
    > ? _Value : never,
>(
    apiFn: _ApiTrigger,
    options?: Options<_Result>,
) => {
    const _errorTable = Object.assign(
        defaultErrorTable,
        options?.errorTable,
    );

    return async ({
        value,
    }: OnSubmitProps<_ApiTrigger>): Promise<string | null> => {
        const response = await apiFn(value);

        if (
            response.error
            && 'status' in response.error
            && typeof response.error.status === 'number'
        ) {
            return (
                _errorTable[codeToName[response.error.status]].toString()
                ?? null
            );
        }

        if (response.error) {
            return _errorTable.INTERNAL_SERVER_ERROR.toString() ?? null;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        options?.onSuccess?.(response.data);

        return null;
    };
};