import { createEntityAdapter, createEntityExtraReducers, createSlice, createSocketExtraReducers, extractReducersFromAdapter } from '@/store/utils';
import { ConversationsApi } from './ConversationsApi';
import { Users } from '../Users';
import { ReduxToolkit } from '@/libs';
import { ConversationsTypes } from './ConversationsTypes';



const name = 'Conversations';

const adapter = createEntityAdapter<ConversationsTypes.EntityState>();

export const ConversationsSlice = createSlice({
    name,
    getInitialState: adapter.getInitialState,
    reducers: () => ({
        ...extractReducersFromAdapter(adapter),
    }),
    extraReducers: (builder) => {
        createSocketExtraReducers(name, adapter, builder);

        createEntityExtraReducers({
            api: ConversationsApi,
            builder,
            addOne: adapter.addOne,
        });

        builder.addMatcher(
            ConversationsApi.endpoints.ConversationGetMany.matchFulfilled,
            adapter.upsertMany,
        );

        builder.addMatcher(
            ReduxToolkit.isAnyOf(
                Users.Api.endpoints.UserLogin.matchFulfilled,
                Users.Api.endpoints.UserRegistration.matchFulfilled,
                Users.Api.endpoints.UserRefresh.matchFulfilled,
                ConversationsApi.endpoints.ConversationGetManyDeep.matchFulfilled,
            ),
            (state, { payload }) => {
                adapter.upsertMany(state, payload.Conversation);
            },
        );
    },
});