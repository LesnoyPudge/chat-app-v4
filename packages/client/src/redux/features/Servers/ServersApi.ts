import { Endpoints } from '@fakeShared';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createCustomQuery } from '@redux/utils';



import Server = Endpoints.V1.Server;

export const ServersApi = createApi({
    baseQuery: createCustomQuery(),
    reducerPath: 'ServersApi',
    tagTypes: ['Servers'],
    endpoints: (build) => ({
        [Server.GetOneByInvitationCode.ActionName]: (
            build.query<
                Server.GetOneByInvitationCode.Response,
                Server.GetOneByInvitationCode.RequestBody
            >({
                query: (body) => ({
                    url: Server.GetOneByInvitationCode.Path,
                    method: Server.GetOneByInvitationCode.Method,
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
    }),
});