import { ServersApi } from './ServersApi';
import { Users } from '../Users';
import { ReduxToolkit } from '@/libs';
import { ServersTypes } from './ServersTypes';
import { createSlice, createSocketExtraReducers, extractReducersFromAdapter } from '@/store/utils';



const name = 'Servers';

const adapter = ReduxToolkit.createEntityAdapter<ServersTypes.EntityState>();

export const ServersSlice = createSlice({
    name,
    getInitialState: adapter.getInitialState,
    reducers: () => ({
        ...extractReducersFromAdapter(adapter),
    }),
    extraReducers: (builder) => {
        createSocketExtraReducers(name, adapter, builder);

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
            ReduxToolkit.isAnyOf(
                ServersApi.endpoints.ServerGetByInvitationCode.matchFulfilled,
                ServersApi.endpoints.ServerCreate.matchFulfilled,
                ServersApi.endpoints.ServerAcceptInvitation.matchFulfilled,
            ),
            adapter.upsertOne,
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