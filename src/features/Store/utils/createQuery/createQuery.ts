import { HTTP_STATUS_CODES } from '@lesnoypudge/utils';
import { localStorageApi } from '@/utils';
import { env, isDev } from '@/vars';
import { ReduxToolkitQuery } from '@/libs';
import { T } from '@lesnoypudge/types-utils-base/namespace';
import { globalActions } from '@/store/globalActions';
import { StoreTypes } from '@/store/types';



type QueryOptions = Parameters<typeof ReduxToolkitQuery.fetchBaseQuery>[0];

export type CustomQueryFn = ReduxToolkitQuery.BaseQueryFn<
    string | ReduxToolkitQuery.FetchArgs,
    unknown,
    StoreTypes.QueryError,
    T.EmptyObject,
    ReduxToolkitQuery.FetchBaseQueryMeta
>;

const createBaseQuery = (
    options: QueryOptions,
) => ReduxToolkitQuery.fetchBaseQuery({
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
    const retryOptions: ReduxToolkitQuery.RetryOptions = {
        maxRetries: isDev ? 1 : 3,
    };

    return ReduxToolkitQuery.retry<CustomQueryFn>(async (...args) => {
        const result = await baseQuery(...args);

        const shouldFail = (
            result.error
            && 'status' in result.error
            && typeof result.error.status === 'number'
            && result.error.status !== HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
        );

        if (shouldFail) ReduxToolkitQuery.retry.fail(result.error);

        return result;
    }, retryOptions);
};

const withReAuthorization = (baseQuery: CustomQueryFn): CustomQueryFn => {
    return async (...args) => {
        const result = await baseQuery(...args);

        if (!result.error) return result;

        if (
            !('status' in result.error)
            || result.error.status !== HTTP_STATUS_CODES.UNAUTHORIZED
        ) {
            return result;
        }

        const api = args[1];

        const refreshToken = localStorageApi.get('refreshToken');

        // Lazily taking user api to prevent circular deps
        // since we use query in rootApi and rootApi in UsersApi.
        // It will return resolved promise.
        const {
            Users,
        } = await import('@/store/features');

        if (!refreshToken) {
            api.dispatch(globalActions.softReset());
            return result;
        }

        const refreshResponse = await api.dispatch(
            Users.Api.endpoints.UserRefresh.initiate({
                refreshToken,
            }, { forceRefetch: true, subscribe: false }),
        );

        if (!refreshResponse.error) return baseQuery(...args);

        api.dispatch(globalActions.softReset());

        return result;
    };
};

export const createQuery = (
    options?: QueryOptions,
): CustomQueryFn => {
    const baseQuery = createBaseQuery(options);

    return withReAuthorization(
        withRetry(
            baseQuery,
        ),
    );
};