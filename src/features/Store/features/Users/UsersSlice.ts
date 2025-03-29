import { UsersApi } from './UsersApi';
import { UsersTypes } from './UsersTypes';
import { createEntityAdapter, createSlice, createSocketExtraReducers, extractReducersFromAdapter } from '@/store/utils';
import { ReduxToolkit } from '@/libs';
import { Servers, Conversations } from '@/store/features';


const name = 'Users';

const adapter = createEntityAdapter<UsersTypes.EntityState>();

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
                UsersApi.endpoints.UserLogin.matchFulfilled,
                UsersApi.endpoints.UserRegistration.matchFulfilled,
                UsersApi.endpoints.UserRefresh.matchFulfilled,
                Servers.Api.endpoints.ServerGetManyDeep.matchFulfilled,
                Conversations.Api.endpoints.ConversationGetManyDeep.matchFulfilled,
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
                UsersApi.endpoints.UserHideConversation.matchFulfilled,
                UsersApi.endpoints.UserMarkConversationNotificationsAsRead.matchFulfilled,
                UsersApi.endpoints.UserMarkServerNotificationsAsRead.matchFulfilled,
                UsersApi.endpoints.UserMuteConversation.matchFulfilled,
                UsersApi.endpoints.UserMuteServer.matchFulfilled,
                UsersApi.endpoints.UserProfileUpdate.matchFulfilled,
                UsersApi.endpoints.UserUnmuteConversation.matchFulfilled,
                UsersApi.endpoints.UserUnmuteServer.matchFulfilled,
            ),
            adapter.upsertOne,
        );
    },
});