import { Endpoints } from '@/fakeShared';
import { createQuery } from '@/store/utils';



import Channel = Endpoints.V1.Channel;
import { ReduxToolkitQueryReact } from '@/libs';

export const ChannelsApi = ReduxToolkitQueryReact.createApi({
    baseQuery: createQuery(),
    reducerPath: 'ChannelsApi',
    tagTypes: ['Channels'],
    endpoints: (build) => ({
        [Channel.GetMany.ActionName]: (
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
                    type: 'Channels',
                    id,
                })) ?? [{ type: 'Channels', id: 'LIST' }],
            })
        ),
    }),
});