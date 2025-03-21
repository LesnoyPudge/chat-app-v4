import { HTTP_STATUS_CODES } from '@lesnoypudge/utils';
import { CustomQueryError } from '@/types';
import { localStorageApi } from '@/utils';
import { env, isDev } from '@/vars';
import { ReduxToolkitQuery } from '@/libs';
import { T } from '@lesnoypudge/types-utils-base/namespace';



type QueryOptions = Parameters<typeof ReduxToolkitQuery.fetchBaseQuery>[0];

export type CustomQueryFn = ReduxToolkitQuery.BaseQueryFn<
    string | ReduxToolkitQuery.FetchArgs,
    unknown,
    CustomQueryError,
    T.EmptyObject,
    ReduxToolkitQuery.FetchBaseQueryMeta
>;

const createBaseQuery = (options: QueryOptions) => ReduxToolkitQuery.fetchBaseQuery({
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

        if (result.error.status !== HTTP_STATUS_CODES.UNAUTHORIZED) {
            return result;
        }

        const api = args[1];

        const refreshToken = localStorageApi.get('refreshToken');

        // Lazily taking user api and app slice to prevent circular deps
        // since we use query in api and api in slice.
        // It will return resolved promise.

        const {
            UsersApi,
        } = await import('@/store/features/nested/Users/UsersApi');

        const {
            AppSlice,
        } = await import('@/store/features/nested/App/AppSlice');

        if (!refreshToken) {
            api.dispatch(AppSlice.actions.softReset());
            return result;
        }

        const refreshResponse = await api.dispatch(
            UsersApi.endpoints.refresh.initiate({
                refreshToken,
            }, { forceRefetch: true, subscribe: false }),
        );

        if (!refreshResponse.error) return baseQuery(...args);

        api.dispatch(AppSlice.actions.softReset());

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