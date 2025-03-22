import { Endpoints } from '@/fakeShared';
import { getRootApi } from '@/store/utils';
import Role = Endpoints.V1.Role;



export const RolesApi = getRootApi().injectEndpoints({
    endpoints: (build) => ({
        [Role.GetMany.NamedAction]: (
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
                    type: 'Role',
                    id,
                })) ?? [{ type: 'Role', id: 'LIST' }],
            })
        ),
    }),
});