import { ServersApi } from './ServersApi';
import { Users } from '../Users';
import { ReduxToolkit } from '@/libs';
import { ServersTypes } from './ServersTypes';
import {
    createEntityAdapter,
    createEntityExtraReducers,
    createSlice,
    createSocketExtraReducers,
    extractReducersFromAdapter,
} from '@/store/utils';



const name = 'Servers';

const adapter = createEntityAdapter<ServersTypes.EntityState>();

export const ServersSlice = createSlice({
    name,
    getInitialState: adapter.getInitialState,
    reducers: () => ({
        ...extractReducersFromAdapter(adapter),
    }),
    extraReducers: (builder) => {
        createSocketExtraReducers(name, adapter, builder);

        createEntityExtraReducers({
            api: ServersApi,
            builder,
            addOne: adapter.addOne,
        });

        builder.addMatcher(
            ReduxToolkit.isAnyOf(
                ServersApi.endpoints.ServerDelete.matchFulfilled,
                ServersApi.endpoints.ServerLeave.matchFulfilled,
            ),
            (state, { meta }) => {
                adapter.removeOne(state, meta.arg.originalArgs.serverId);
            },
        );

        builder.addMatcher(
            ServersApi.endpoints.ServerCreate.matchFulfilled,
            adapter.upsertOne,
        );

        builder.addMatcher(
            ServersApi.endpoints.ServerGetMany.matchFulfilled,
            adapter.upsertMany,
        );

        builder.addMatcher(
            ReduxToolkit.isAnyOf(
                Users.Api.endpoints.UserLogin.matchFulfilled,
                Users.Api.endpoints.UserRegistration.matchFulfilled,
                Users.Api.endpoints.UserRefresh.matchFulfilled,
                ServersApi.endpoints.ServerGetManyDeep.matchFulfilled,
            ),
            (state, { payload }) => {
                adapter.upsertMany(state, payload.Server);
            },
        );

        builder.addMatcher(
            ServersApi.endpoints.ServerGetMembers.matchFulfilled,
            (state, { payload, meta }) => {
                const serverId = meta.arg.originalArgs.serverId;
                const server = state.entities[serverId];
                if (!server) return;

                const newIds = payload.User.map((v) => v.id);

                adapter.updateOne(state, {
                    id: serverId,
                    changes: {
                        members: [...server.members, ...newIds],
                    },
                });
            },
        );

        builder.addMatcher(
            ServersApi.endpoints.ServerLeave.matchFulfilled,
            (state, { meta }) => {
                adapter.removeOne(
                    state,
                    meta.arg.originalArgs.serverId,
                );
            },
        );
    },
});