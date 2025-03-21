import { Endpoints } from '@/fakeShared';
import { createQuery } from '@/store/utils';
import Role = Endpoints.V1.Role;
import { ReduxToolkitQueryReact } from '@/libs';



export const RolesApi = ReduxToolkitQueryReact.createApi({
    baseQuery: createQuery(),
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