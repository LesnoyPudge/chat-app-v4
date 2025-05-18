import { Endpoints } from '@/fakeShared';
import { getRootApi } from '@/store/utils';



import Message = Endpoints.V1.Message;



export const MessagesApi = getRootApi().injectEndpoints({
    endpoints: (build) => ({
        [Message.Send.NamedAction]: (
            build.mutation<
                Message.Send.Response,
                Message.Send.RequestBody
            >({
                query: (body) => ({
                    url: Message.Send.Path,
                    method: Message.Send.Method,
                    body,
                }),
            })
        ),
        [Message.Edit.NamedAction]: (
            build.mutation<
                Message.Edit.Response,
                Message.Edit.RequestBody
            >({
                query: (body) => ({
                    url: Message.Edit.Path,
                    method: Message.Edit.Method,
                    body,
                }),
            })
        ),
        [Message.ToggleReaction.NamedAction]: (
            build.mutation<
                Message.ToggleReaction.Response,
                Message.ToggleReaction.RequestBody
            >({
                query: (body) => ({
                    url: Message.ToggleReaction.Path,
                    method: Message.ToggleReaction.Method,
                    body,
                }),
            })
        ),
        [Message.GetManyByTextChatId.NamedAction]: (
            build.query<
                Message.GetManyByTextChatId.Response,
                Message.GetManyByTextChatId.RequestBody
            >({
                query: (body) => ({
                    url: Message.GetManyByTextChatId.Path,
                    method: Message.GetManyByTextChatId.Method,
                    body,
                }),
                providesTags: (result) => result?.Message.map(({ id }) => ({
                    type: 'Message',
                    id,
                })) ?? [{ type: 'Message', id: 'LIST' }],
            })
        ),
    }),
});