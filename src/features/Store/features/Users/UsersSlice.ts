import { UsersApi } from './UsersApi';
import { UsersTypes } from './UsersTypes';
import { createSlice, createSocketExtraReducers, extractReducersFromAdapter } from '@/store/utils';
import { ReduxToolkit } from '@/libs';
import { Servers, Conversations } from '@/store/features';


const name = 'Users';

const adapter = ReduxToolkit.createEntityAdapter<UsersTypes.EntityState>();

export const UsersSlice = createSlice({
    name,
    getInitialState: adapter.getInitialState,
    reducers: () => ({
        ...extractReducersFromAdapter(adapter),
    }),
    extraReducers: (builder) => {
        createSocketExtraReducers(name, adapter, builder);

        builder.addMatcher(
            ReduxToolkit.isAnyOf(
                UsersApi.endpoints.login.matchFulfilled,
                UsersApi.endpoints.registration.matchFulfilled,
                UsersApi.endpoints.refresh.matchFulfilled,
                Servers.Api.endpoints.getManyDeep.matchFulfilled,
                Conversations.Api.endpoints.getManyDeep.matchFulfilled,
            ),
            (state, { payload }) => {
                const result = [...payload.User];

                if ('userData' in payload) {
                    result.push(payload.userData);
                }

                adapter.upsertMany(state, result);
            },
        );

        builder.addMatcher(
            ReduxToolkit.isAnyOf(
                UsersApi.endpoints.hideConversation.matchFulfilled,
                UsersApi.endpoints.markConversationNotificationsAsRead.matchFulfilled,
                UsersApi.endpoints.markServerNotificationsAsRead.matchFulfilled,
                UsersApi.endpoints.muteConversation.matchFulfilled,
                UsersApi.endpoints.muteServer.matchFulfilled,
                UsersApi.endpoints.profileUpdate.matchFulfilled,
                UsersApi.endpoints.unmuteConversation.matchFulfilled,
                UsersApi.endpoints.unmuteServer.matchFulfilled,
            ),
            adapter.upsertOne,
        );
    },
});