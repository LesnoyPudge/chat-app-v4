import { createSlice, createSocketExtraReducers, extractReducersFromAdapter } from '@/store/utils';
import { ChannelsApi } from './ChannelsApi';
import { Users, Servers } from '@/store/features';
import { ReduxToolkit } from '@/libs';
import { ChannelsTypes } from './ChannelsTypes';



const name = 'Channels';

const adapter = ReduxToolkit.createEntityAdapter<ChannelsTypes.EntityState>();

export const ChannelsSlice = createSlice({
    name,
    getInitialState: adapter.getInitialState,
    reducers: () => ({
        ...extractReducersFromAdapter(adapter),
    }),
    extraReducers: (builder) => {
        createSocketExtraReducers(name, adapter, builder);

        builder.addMatcher(
            ReduxToolkit.isAnyOf(
                Users.Api.endpoints.login.matchFulfilled,
                Users.Api.endpoints.registration.matchFulfilled,
                Users.Api.endpoints.refresh.matchFulfilled,
                Servers.Api.endpoints.getManyDeep.matchFulfilled,
            ),
            (state, { payload }) => {
                adapter.upsertMany(state, payload.Channel);
            },
        );

        builder.addMatcher(
            ChannelsApi.endpoints.getMany.matchFulfilled,
            adapter.upsertMany,
        );
    },
});