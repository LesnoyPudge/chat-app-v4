import { getRootApi } from '@/store/utils';
// import VoiceChat = Endpoints.V1.VoiceChat;



export const VoiceChatsApi = getRootApi().injectEndpoints({
    endpoints: (build) => ({
        // [VoiceChat.GetMany.NamedAction]: (
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