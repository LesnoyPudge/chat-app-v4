import { Endpoints } from '@/fakeShared';
import { getRootApi } from '@/store/utils';
import Channel = Endpoints.V1.Channel;



export const ChannelsApi = getRootApi().injectEndpoints({
    endpoints: (build) => ({
        [Channel.GetMany.NamedAction]: (
            build.query<
                Channel.GetMany.Response,
                Channel.GetMany.RequestBody
            >({
                query: (body) => ({
                    url: Channel.GetMany.Path,
                    method: Channel.GetMany.Method,
                    body,
                }),
                providesTags: (result) => result?.map(({ id }) => ({
                    type: 'Channel',
                    id,
                })) ?? [{ type: 'Channel', id: 'LIST' }],
            })
        ),
    }),
});