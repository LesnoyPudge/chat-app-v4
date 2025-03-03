import { Endpoints } from '@/fakeShared';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createCustomQuery } from '@/redux/utils';



import TextChat = Endpoints.V1.TextChat;

export const TextChatsApi = createApi({
    baseQuery: createCustomQuery(),
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