import { Endpoints } from '@/fakeShared';
import { createQuery } from '@/store/utils';
import TextChat = Endpoints.V1.TextChat;
import { ReduxToolkitQueryReact } from '@/libs';



export const TextChatsApi = ReduxToolkitQueryReact.createApi({
    baseQuery: createQuery(),
    reducerPath: 'TextChatsApi',
    tagTypes: ['TextChats'],
    endpoints: (build) => ({
        [TextChat.GetMany.ActionName]: (
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
                    type: 'TextChats',
                    id,
                })) ?? [{ type: 'TextChats', id: 'LIST' }],
            })
        ),
    }),
});