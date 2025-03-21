import { Endpoints } from '@/fakeShared';
import { createQuery } from '@/store/utils';
import Server = Endpoints.V1.Server;
import { ReduxToolkitQueryReact } from '@/libs';



export const ServersApi = ReduxToolkitQueryReact.createApi({
    baseQuery: createQuery(),
    reducerPath: 'ServersApi',
    tagTypes: ['Servers'],
    endpoints: (build) => ({
        [Server.GetByInvitationCode.ActionName]: (
            build.query<
                Server.GetByInvitationCode.Response,
                Server.GetByInvitationCode.RequestBody
            >({
                query: (body) => ({
                    url: Server.GetByInvitationCode.Path,
                    method: Server.GetByInvitationCode.Method,
                    body,
                }),
                providesTags: (result) => [
                    { type: 'Servers', id: result?.id },
                ],
            })
        ),

        [Server.AcceptInvitation.ActionName]: (
            build.mutation<
                Server.AcceptInvitation.Response,
                Server.AcceptInvitation.RequestBody
            >({
                query: (body) => ({
                    url: Server.AcceptInvitation.Path,
                    method: Server.AcceptInvitation.Method,
                    body,
                }),
                invalidatesTags: (result) => [
                    { type: 'Servers', id: result?.id },
                ],
            })
        ),

        [Server.Create.ActionName]: (
            build.mutation<
                Server.Create.Response,
                Server.Create.RequestBody
            >({
                query: (body) => ({
                    url: Server.Create.Path,
                    method: Server.Create.Method,
                    body,
                }),
                invalidatesTags: (result) => [
                    { type: 'Servers', id: result?.id },
                ],
            })
        ),

        [Server.Leave.ActionName]: (
            build.mutation<
                Server.Leave.Response,
                Server.Leave.RequestBody
            >({
                query: (body) => ({
                    url: Server.Leave.Path,
                    method: Server.Leave.Method,
                    body,
                }),
            })
        ),

        [Server.GetMany.ActionName]: (
            build.query<
                Server.GetMany.Response,
                Server.GetMany.RequestBody
            >({
                query: (body) => ({
                    url: Server.GetMany.Path,
                    method: Server.GetMany.Method,
                    body,
                }),
                providesTags: (result) => result?.map(({ id }) => ({
                    type: 'Servers',
                    id,
                })) ?? [{ type: 'Servers', id: 'LIST' }],
            })
        ),

        [Server.GetManyDeep.ActionName]: (
            build.query<
                Server.GetManyDeep.Response,
                Server.GetManyDeep.RequestBody
            >({
                query: (body) => ({
                    url: Server.GetManyDeep.Path,
                    method: Server.GetManyDeep.Method,
                    body,
                }),
            })
        ),
    }),
});