import { STATUS_CODE } from '@lesnoypudge/utils';
import { Features } from '@redux/features';
import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryMeta,
    retry,
    RetryOptions,
} from '@reduxjs/toolkit/query';
import { CustomQueryError } from '@types';
import { localStorageApi } from '@utils';
import { env, isDev } from '@vars';



type QueryOptions = Parameters<typeof fetchBaseQuery>[0];

export type CustomQueryFn = BaseQueryFn<
    string | FetchArgs,
    unknown,
    CustomQueryError,
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    {},
    FetchBaseQueryMeta
>;

const createBaseQuery = (options: QueryOptions) => fetchBaseQuery({
    baseUrl: env._PUBLIC_SERVER_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorageApi.get('accessToken');

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    },
    ...options,
}) as CustomQueryFn;

const withRetry = (baseQuery: CustomQueryFn): CustomQueryFn => {
    const retryOptions: RetryOptions = {
        maxRetries: isDev ? 1 : 3,
    };

    return retry<CustomQueryFn>(async (...args) => {
        const result = await baseQuery(...args);

        const shouldFail = (
            result.error
            && 'status' in result.error
            && typeof result.error.status === 'number'
            && result.error.status !== STATUS_CODE.INTERNAL_SERVER_ERROR
        );

        if (shouldFail) retry.fail(result.error);

        return result;
    }, retryOptions);
};

const withReAuthorization = (baseQuery: CustomQueryFn): CustomQueryFn => {
    return async (...args) => {
        const result = await baseQuery(...args);

        if (!result.error) return result;

        if (result.error.status !== STATUS_CODE.UNAUTHORIZED) {
            return result;
        }

        const api = args[1];

        const refreshToken = localStorageApi.get('refreshToken');

        if (!refreshToken) {
            api.dispatch(Features.App.Slice.actions.softReset());
            return result;
        }

        const refreshResponse = await api.dispatch(
            Features.Users.Api.endpoints.refresh.initiate({
                refreshToken,
            }, { forceRefetch: true, subscribe: false }),
        );

        if (!refreshResponse.error) return baseQuery(...args);

        api.dispatch(Features.App.Slice.actions.softReset());

        return result;
    };
};

export const createCustomQuery = (
    options?: QueryOptions,
): CustomQueryFn => {
    const baseQuery = createBaseQuery(options);

    return withReAuthorization(
        withRetry(
            baseQuery,
        ),
    );
};