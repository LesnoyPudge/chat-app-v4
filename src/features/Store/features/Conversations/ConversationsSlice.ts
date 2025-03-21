import { createSlice, createSocketExtraReducers, extractReducersFromAdapter } from '@/store/utils';
import { ConversationsApi } from './ConversationsApi';
import { Users } from '../Users';
import { ReduxToolkit } from '@/libs';
import { ConversationsTypes } from './ConversationsTypes';



const name = 'Conversations';

const adapter = ReduxToolkit.createEntityAdapter<ConversationsTypes.EntityState>();

export const ConversationsSlice = createSlice({
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
                ConversationsApi.endpoints.getManyDeep.matchFulfilled,
            ),
            (state, { payload }) => {
                adapter.upsertMany(state, payload.Conversation);
            },
        );
    },
});