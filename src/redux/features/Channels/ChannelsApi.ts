import { Endpoints } from '@/fakeShared';
import { createApi } from '@reduxjs/toolkit/query/react';
import { createCustomQuery } from '@/redux/utils';



import Channel = Endpoints.V1.Channel;

export const ChannelsApi = createApi({
    baseQuery: createCustomQuery(),
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