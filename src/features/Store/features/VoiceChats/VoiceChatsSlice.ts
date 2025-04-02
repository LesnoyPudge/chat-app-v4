import {
    createEntityAdapter,
    createEntityExtraReducers,
    createSlice,
    createSocketExtraReducers,
    extractReducersFromAdapter,
} from '@/store/utils';
import { Users } from '../Users';
import { Servers } from '../Servers';
import { Conversations } from '../Conversations';
import { VoiceChatsTypes } from './VoiceChatsTypes';
import { ReduxToolkit } from '@/libs';
import { VoiceChatsApi } from './VoiceChatsApi';



const name = 'VoiceChats';

const adapter = createEntityAdapter<VoiceChatsTypes.EntityState>();

export const VoiceChatsSlice = createSlice({
    name,
    getInitialState: adapter.getInitialState,
    reducers: () => ({
        ...extractReducersFromAdapter(adapter),
    }),
    extraReducers: (builder) => {
        createSocketExtraReducers(name, adapter, builder);

        createEntityExtraReducers({
            api: VoiceChatsApi,
            builder,
            addOne: adapter.addOne,
        });

        // builder.addMatcher(
        //     VoiceChatsApi.endpoints.GetMany.matchFulfilled,
        //     adapter.upsertMany,
        // );

        builder.addMatcher(
            ReduxToolkit.isAnyOf(
                Users.Api.endpoints.UserLogin.matchFulfilled,
                Users.Api.endpoints.UserRegistration.matchFulfilled,
                Users.Api.endpoints.UserRefresh.matchFulfilled,
                Servers.Api.endpoints.ServerGetManyDeep.matchFulfilled,
                Conversations.Api.endpoints.ConversationGetManyDeep.matchFulfilled,
            ),
            (state, { payload }) => {
                adapter.upsertMany(state, payload.VoiceChat);
            },
        );
    },
});