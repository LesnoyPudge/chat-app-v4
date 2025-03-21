import {
    createSlice,
    createSocketExtraReducers,
    extractReducersFromAdapter,
} from '@/store/utils';
import { Users } from '../Users';
import { Servers } from '../Servers';
import { Conversations } from '../Conversations';
import { VoiceChatsTypes } from './VoiceChatsTypes';
import { ReduxToolkit } from '@/libs';



const name = 'VoiceChats';

const adapter = ReduxToolkit.createEntityAdapter<VoiceChatsTypes.EntityState>();

export const VoiceChatsSlice = createSlice({
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
                adapter.upsertMany(state, payload.VoiceChat);
            },
        );
    },
});