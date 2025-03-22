import { Endpoints } from '@/fakeShared';
import { getRootApi } from '@/store/utils';
import Conversation = Endpoints.V1.Conversation;



export const ConversationsApi = getRootApi().injectEndpoints({
    endpoints: (build) => ({
        [Conversation.GetMany.NamedAction]: (
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
                    type: 'Conversation',
                    id,
                })) ?? [{ type: 'Conversation', id: 'LIST' }],
            })
        ),

        [Conversation.GetManyDeep.NamedAction]: (
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