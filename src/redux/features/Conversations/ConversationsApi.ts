import { Endpoints } from '@fakeShared';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createCustomQuery } from '@redux/utils';



import Conversation = Endpoints.V1.Conversation;

export const ConversationsApi = createApi({
    baseQuery: createCustomQuery(),
    reducerPath: 'ConversationsApi',
    tagTypes: ['Conversations'],
    endpoints: (build) => ({
        [Conversation.GetMany.ActionName]: (
            build.query<
                Conversation.GetMany.Response,
                Conversation.GetMany.RequestBody
            >({
                query: (body) => ({
                    url: Conversation.GetMany.Path,
                    method: Conversation.GetMany.Method,
                    body,
                }),
                providesTags: (result) => result?.map(({ id }) => ({
                    type: 'Conversations',
                    id,
                })) ?? [{ type: 'Conversations', id: 'LIST' }],
            })
        ),

        [Conversation.GetManyDeep.ActionName]: (
            build.query<
                Conversation.GetManyDeep.Response,
                Conversation.GetManyDeep.RequestBody
            >({
                query: (body) => ({
                    url: Conversation.GetManyDeep.Path,
                    method: Conversation.GetManyDeep.Method,
                    body,
                }),
            })
        ),
    }),
});