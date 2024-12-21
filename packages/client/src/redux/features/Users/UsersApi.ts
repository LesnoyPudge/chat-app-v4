import { Endpoints } from '@fakeShared';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createCustomQuery } from '@redux/utils';



import User = Endpoints.V1.User;

export const UsersApi = createApi({
    baseQuery: createCustomQuery(),
    reducerPath: 'UsersApi',
    tagTypes: ['Users'],
    endpoints: (build) => ({
        [User.Login.ActionName]: (
            build.mutation<
                User.Login.Response,
                User.Login.RequestBody
            >({
                query: (body) => ({
                    url: User.Login.Path,
                    method: User.Login.Method,
                    body,
                }),
            })
        ),
        [User.Refresh.ActionName]: (
            build.query<
                User.Refresh.Response,
                User.Refresh.RequestBody
            >({
                query: (body) => ({
                    url: User.Refresh.Path,
                    method: User.Refresh.Method,
                    body,
                }),
            })
        ),
        [User.Registration.ActionName]: (
            build.mutation<
                User.Registration.Response,
                User.Registration.RequestBody
            >({
                query: (body) => ({
                    url: User.Registration.Path,
                    method: User.Registration.Method,
                    body,
                }),
            })
        ),
    }),
});