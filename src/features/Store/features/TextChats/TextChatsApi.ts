import { Endpoints } from '@/fakeShared';
import { getRootApi } from '@/store/utils';
import TextChat = Endpoints.V1.TextChat;



export const TextChatsApi = getRootApi().injectEndpoints({
    endpoints: (build) => ({
        [TextChat.GetMany.NamedAction]: (
            build.query<
                TextChat.GetMany.Response,
                TextChat.GetMany.RequestBody
            >({
                query: (body) => ({
                    url: TextChat.GetMany.Path,
                    method: TextChat.GetMany.Method,
                    body,
                }),
                providesTags: (result) => result?.map(({ id }) => ({
                    type: 'TextChat',
                    id,
                })) ?? [{ type: 'TextChat', id: 'LIST' }],
            })
        ),
    }),
});