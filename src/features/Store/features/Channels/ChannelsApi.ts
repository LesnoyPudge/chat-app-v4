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
        [Channel.Create.NamedAction]: (
            build.mutation<
                Channel.Create.Response,
                Channel.Create.RequestBody
            >({
                query: (body) => ({
                    url: Channel.Create.Path,
                    method: Channel.Create.Method,
                    body,
                }),
            })
        ),
        [Channel.Update.NamedAction]: (
            build.mutation<
                Channel.Update.Response,
                Channel.Update.RequestBody
            >({
                query: (body) => ({
                    url: Channel.Update.Path,
                    method: Channel.Update.Method,
                    body,
                }),
            })
        ),
        [Channel.Delete.NamedAction]: (
            build.mutation<
                Channel.Delete.Response,
                Channel.Delete.RequestBody
            >({
                query: (body) => ({
                    url: Channel.Delete.Path,
                    method: Channel.Delete.Method,
                    body,
                }),
            })
        ),
    }),
});