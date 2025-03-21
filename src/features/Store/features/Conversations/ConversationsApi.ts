import { Endpoints } from '@/fakeShared';
import { createQuery } from '@/store/utils';
import { ReduxToolkitQueryReact } from '@/libs';
import Conversation = Endpoints.V1.Conversation;



export const ConversationsApi = ReduxToolkitQueryReact.createApi({
    baseQuery: createQuery(),
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