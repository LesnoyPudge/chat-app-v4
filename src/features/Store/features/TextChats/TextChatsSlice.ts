import { Users } from '../Users';
import { Servers } from '../Servers';
import { Conversations } from '../Conversations';
import { ReduxToolkit } from '@/libs';
import { TextChatsTypes } from './TextChatsTypes';
import { createEntityAdapter, createSlice, createSocketExtraReducers, extractReducersFromAdapter } from '@/store/utils';



const name = 'TextChats';

const adapter = createEntityAdapter<TextChatsTypes.EntityState>();

export const TextChatsSlice = createSlice({
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
                Conversations.Api.endpoints.ConversationGetManyDeep.matchFulfilled,
            ),
            (state, { payload }) => {
                adapter.upsertMany(state, payload.TextChat);
            },
        );
    },
});