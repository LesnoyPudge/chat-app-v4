import { ReduxToolkitQueryReact } from '@/libs';
import { createQuery } from '@/store/utils';
// import VoiceChat = Endpoints.V1.VoiceChat;



export const VoiceChatsApi = ReduxToolkitQueryReact.createApi({
    baseQuery: createQuery(),
    reducerPath: 'VoiceChatsApi',
    tagTypes: ['VoiceChats'],
    endpoints: (build) => ({
        // [VoiceChat.GetMany.ActionName]: (
        //     build.query<
        //         VoiceChat.GetMany.Response,
        //         VoiceChat.GetMany.RequestBody
        //     >({
        //         query: (body) => ({
        //             url: VoiceChat.GetMany.Path,
        //             method: VoiceChat.GetMany.Method,
        //             body,
        //         }),
        //         providesTags: (result) => result?.map(({ id }) => ({
        //             type: 'VoiceChats',
        //             id,
        //         })) ?? [{ type: 'VoiceChats', id: 'LIST' }],
        //     })
        // ),
    }),
});