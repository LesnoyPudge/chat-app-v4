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
                Users.Api.endpoints.login.matchFulfilled,
                Users.Api.endpoints.registration.matchFulfilled,
                Users.Api.endpoints.refresh.matchFulfilled,
                ServersApi.endpoints.getManyDeep.matchFulfilled,
            ),
            (state, { payload }) => {
                adapter.upsertMany(state, payload.Server);
            },
        );

        builder.addMatcher(
            ReduxToolkit.isAnyOf(
                ServersApi.endpoints.getByInvitationCode.matchFulfilled,
                ServersApi.endpoints.create.matchFulfilled,
                ServersApi.endpoints.acceptInvitation.matchFulfilled,
            ),
            adapter.upsertOne,
        );
        builder.addMatcher(
            ServersApi.endpoints.leave.matchFulfilled,
            (state, { meta }) => {
                adapter.removeOne(
                    state,
                    meta.arg.originalArgs.serverId,
                );
            },
        );
    },
});