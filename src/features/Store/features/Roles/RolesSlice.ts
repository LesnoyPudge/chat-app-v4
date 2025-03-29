import { Users } from '../Users';
import { Servers } from '../Servers';
import { ReduxToolkit } from '@/libs';
import { RolesTypes } from './RolesTypes';
import { createEntityAdapter, createSlice, createSocketExtraReducers, extractReducersFromAdapter } from '@/store/utils';



const name = 'Roles';

const adapter = createEntityAdapter<RolesTypes.EntityState>();

export const RolesSlice = createSlice({
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
                Servers.Api.endpoints.ServerGetManyDeep.matchFulfilled,
            ),
            (state, { payload }) => {
                adapter.upsertMany(state, payload.Role);
            },
        );
    },
});