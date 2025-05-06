import { Endpoints } from '@/fakeShared';
import { getRootApi } from '@/store/utils';
import User = Endpoints.V1.User;



export const UsersApi = getRootApi().injectEndpoints({
    endpoints: (build) => ({
        [User.Login.NamedAction]: (
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
        [User.Refresh.NamedAction]: (
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
        [User.Registration.NamedAction]: (
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
        [User.MuteServer.NamedAction]: (
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
        [User.UnmuteServer.NamedAction]: (
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
        [User.MarkServerNotificationsAsRead.NamedAction]: (
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
        [User.MuteConversation.NamedAction]: (
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
        [User.UnmuteConversation.NamedAction]: (
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
        [User.MarkConversationNotificationsAsRead.NamedAction]: (
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
        [User.HideConversation.NamedAction]: (
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
        [User.GetMany.NamedAction]: (
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
                    type: 'User',
                    id,
                })) ?? [{ type: 'User', id: 'LIST' }],
            })
        ),
        [User.ProfileUpdate.NamedAction]: (
            build.mutation<
                User.ProfileUpdate.Response,
                User.ProfileUpdate.RequestBody
            >({
                query: (body) => ({
                    url: User.ProfileUpdate.Path,
                    method: User.ProfileUpdate.Method,
                    body,
                }),
            })
        ),
        [User.DeleteFriend.NamedAction]: (
            build.mutation<
                User.DeleteFriend.Response,
                User.DeleteFriend.RequestBody
            >({
                query: (body) => ({
                    url: User.DeleteFriend.Path,
                    method: User.DeleteFriend.Method,
                    body,
                }),
            })
        ),
        [User.Unblock.NamedAction]: (
            build.mutation<
                User.Unblock.Response,
                User.Unblock.RequestBody
            >({
                query: (body) => ({
                    url: User.Unblock.Path,
                    method: User.Unblock.Method,
                    body,
                }),
            })
        ),
        [User.AcceptFriendRequest.NamedAction]: (
            build.mutation<
                User.AcceptFriendRequest.Response,
                User.AcceptFriendRequest.RequestBody
            >({
                query: (body) => ({
                    url: User.AcceptFriendRequest.Path,
                    method: User.AcceptFriendRequest.Method,
                    body,
                }),
            })
        ),
        [User.RejectFriendRequest.NamedAction]: (
            build.mutation<
                User.RejectFriendRequest.Response,
                User.RejectFriendRequest.RequestBody
            >({
                query: (body) => ({
                    url: User.RejectFriendRequest.Path,
                    method: User.RejectFriendRequest.Method,
                    body,
                }),
            })
        ),
        [User.RevokeFriendRequest.NamedAction]: (
            build.mutation<
                User.RevokeFriendRequest.Response,
                User.RevokeFriendRequest.RequestBody
            >({
                query: (body) => ({
                    url: User.RevokeFriendRequest.Path,
                    method: User.RevokeFriendRequest.Method,
                    body,
                }),
            })
        ),
        [User.MarkTextChatAsRead.NamedAction]: (
            build.mutation<
                User.MarkTextChatAsRead.Response,
                User.MarkTextChatAsRead.RequestBody
            >({
                query: (body) => ({
                    url: User.MarkTextChatAsRead.Path,
                    method: User.MarkTextChatAsRead.Method,
                    body,
                }),
            })
        ),
    }),
});