import { Endpoints } from '@fakeShared';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createCustomQuery } from '@redux/utils';



import Role = Endpoints.V1.Role;

export const RolesApi = createApi({
    baseQuery: createCustomQuery(),
    reducerPath: 'RolesApi',
    tagTypes: ['Roles'],
    endpoints: (build) => ({
        [Role.GetMany.ActionName]: (
            build.query<
                Role.GetMany.Response,
                Role.GetMany.RequestBody
            >({
                query: (body) => ({
                    url: Role.GetMany.Path,
                    method: Role.GetMany.Method,
                    body,
                }),
                providesTags: (result) => result?.map(({ id }) => ({
                    type: 'Roles',
                    id,
                })) ?? [{ type: 'Roles', id: 'LIST' }],
            })
        ),
    }),
});