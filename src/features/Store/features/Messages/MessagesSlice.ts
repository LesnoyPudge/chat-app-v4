import { createSlice, createSocketExtraReducers, extractReducersFromAdapter } from '@/store/utils';
import { Users } from '../Users';
import { ReduxToolkit } from '@/libs';
import { MessagesTypes } from './MessagesTypes';



const name = 'Messages';

const adapter = ReduxToolkit.createEntityAdapter<MessagesTypes.EntityState>();

export const MessagesSlice = createSlice({
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
            ),
            (state, { payload }) => {
                adapter.upsertMany(state, payload.Message);
            },
        );
    },
});