import { Endpoints } from '@/fakeShared';
import { getRootApi } from '@/store/utils';
import Server = Endpoints.V1.Server;



export const ServersApi = getRootApi().injectEndpoints({
    endpoints: (build) => ({
        [Server.GetByInvitationCode.NamedAction]: (
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
                    { type: 'Server', id: result?.id },
                ],
            })
        ),

        [Server.AcceptInvitation.NamedAction]: (
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
                    { type: 'Server', id: result?.id },
                ],
            })
        ),

        [Server.Create.NamedAction]: (
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
                    { type: 'Server', id: result?.id },
                ],
            })
        ),

        [Server.Leave.NamedAction]: (
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

        [Server.GetMany.NamedAction]: (
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
                    type: 'Server',
                    id,
                })) ?? [{ type: 'Server', id: 'LIST' }],
            })
        ),

        [Server.GetManyDeep.NamedAction]: (
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