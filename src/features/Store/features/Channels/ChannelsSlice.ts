import {
    createEntityAdapter,
    createEntityExtraReducers,
    createSlice,
    createSocketExtraReducers,
    extractReducersFromAdapter,
} from '@/store/utils';
import { ChannelsApi } from './ChannelsApi';
import { Users, Servers } from '@/store/features';
import { ReduxToolkit } from '@/libs';
import { ChannelsTypes } from './ChannelsTypes';



const name = 'Channels';

const adapter = createEntityAdapter<ChannelsTypes.EntityState>();

export const ChannelsSlice = createSlice({
    name,
    getInitialState: adapter.getInitialState,
    reducers: () => ({
        ...extractReducersFromAdapter(adapter),
    }),
    extraReducers: (builder) => {
        createSocketExtraReducers(name, adapter, builder);

        createEntityExtraReducers({
            api: ChannelsApi,
            builder,
            addOne: adapter.addOne,
        });

        builder.addMatcher(
            ChannelsApi.endpoints.ChannelGetMany.matchFulfilled,
            adapter.upsertMany,
        );

        builder.addMatcher(
            ReduxToolkit.isAnyOf(
                Users.Api.endpoints.UserLogin.matchFulfilled,
                Users.Api.endpoints.UserRegistration.matchFulfilled,
                Users.Api.endpoints.UserRefresh.matchFulfilled,
                Servers.Api.endpoints.ServerGetManyDeep.matchFulfilled,
            ),
            (state, { payload }) => {
                adapter.upsertMany(state, payload.Channel);
            },
        );
    },
});