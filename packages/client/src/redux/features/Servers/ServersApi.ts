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
    }),
});