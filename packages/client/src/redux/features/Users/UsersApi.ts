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
        [User.MuteServer.ActionName]: (
            build.mutation<
                User.MuteServer.Response,
                User.MuteServer.RequestBody
            >({
                query: (body) => ({
                    url: User.MuteServer.Path,
                    method: User.MuteServer.Method,
                    body,
                }),
            })
        ),
        [User.UnmuteServer.ActionName]: (
            build.mutation<
                User.UnmuteServer.Response,
                User.UnmuteServer.RequestBody
            >({
                query: (body) => ({
                    url: User.UnmuteServer.Path,
                    method: User.UnmuteServer.Method,
                    body,
                }),

            })
        ),
        [User.MarkServerNotificationsAsRead.ActionName]: (
            build.mutation<
                User.MarkServerNotificationsAsRead.Response,
                User.MarkServerNotificationsAsRead.RequestBody
            >({
                query: (body) => ({
                    url: User.MarkServerNotificationsAsRead.Path,
                    method: User.MarkServerNotificationsAsRead.Method,
                    body,
                }),
            })
        ),
        [User.MuteConversation.ActionName]: (
            build.mutation<
                User.MuteConversation.Response,
                User.MuteConversation.RequestBody
            >({
                query: (body) => ({
                    url: User.MuteConversation.Path,
                    method: User.MuteConversation.Method,
                    body,
                }),
            })
        ),
        [User.UnmuteConversation.ActionName]: (
            build.mutation<
                User.UnmuteConversation.Response,
                User.UnmuteConversation.RequestBody
            >({
                query: (body) => ({
                    url: User.UnmuteConversation.Path,
                    method: User.UnmuteConversation.Method,
                    body,
                }),

            })
        ),
        [User.MarkConversationNotificationsAsRead.ActionName]: (
            build.mutation<
                User.MarkConversationNotificationsAsRead.Response,
                User.MarkConversationNotificationsAsRead.RequestBody
            >({
                query: (body) => ({
                    url: User.MarkConversationNotificationsAsRead.Path,
                    method: User.MarkConversationNotificationsAsRead.Method,
                    body,
                }),
            })
        ),
        [User.HideConversation.ActionName]: (
            build.mutation<
                User.HideConversation.Response,
                User.HideConversation.RequestBody
            >({
                query: (body) => ({
                    url: User.HideConversation.Path,
                    method: User.HideConversation.Method,
                    body,
                }),
            })
        ),
        [User.GetMany.ActionName]: (
            build.query<
                User.GetMany.Response,
                User.GetMany.RequestBody
            >({
                query: (body) => ({
                    url: User.GetMany.Path,
                    method: User.GetMany.Method,
                    body,
                }),
                providesTags: (result) => result?.map(({ id }) => ({
                    type: 'Users',
                    id,
                })) ?? [{ type: 'Users', id: 'LIST' }],
            })
        ),
    }),
});