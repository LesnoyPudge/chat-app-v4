import { Users } from '../Users';
import { Servers } from '../Servers';
import { Conversations } from '../Conversations';
import { ReduxToolkit } from '@/libs';
import { TextChatsTypes } from './TextChatsTypes';
import { createSlice, createSocketExtraReducers, extractReducersFromAdapter } from '@/store/utils';



const name = 'TextChats';

const adapter = ReduxToolkit.createEntityAdapter<TextChatsTypes.EntityState>();

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
                Users.Api.endpoints.login.matchFulfilled,
                Users.Api.endpoints.registration.matchFulfilled,
                Users.Api.endpoints.refresh.matchFulfilled,
                Servers.Api.endpoints.getManyDeep.matchFulfilled,
                Conversations.Api.endpoints.getManyDeep.matchFulfilled,
            ),
            (state, { payload }) => {
                adapter.upsertMany(state, payload.TextChat);
            },
        );
    },
});