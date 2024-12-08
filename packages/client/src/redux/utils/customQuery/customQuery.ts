import { Endpoints } from '@fakeShared';
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
import { env } from '@vars';



type QueryOptions = Parameters<typeof fetchBaseQuery>[0];

type CustomQueryFn = BaseQueryFn<
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
    ...options,
}) as CustomQueryFn;

const withRetry = (baseQuery: CustomQueryFn): CustomQueryFn => {
    const retryOptions: RetryOptions = {
        maxRetries: 5,
    };

    return retry<CustomQueryFn>(async (...args) => {
        const result = await baseQuery(...args);

        const shouldBail = (
            result.error?.status !== STATUS_CODE.INTERNAL_SERVER_ERROR
        );

        if (shouldBail) retry.fail(result.error);

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

        // const refreshResponse = await baseQuery(
        //     Endpoints.V1.User.Refresh.Path,
        //     api,
        //     args[2],
        // );

        const refreshResponse = await api.dispatch(
            Features.User.Api.endpoints.refresh.initiate(),
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