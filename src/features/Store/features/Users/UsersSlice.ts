import { UsersApi } from './UsersApi';
import { UsersTypes } from './UsersTypes';
import {
    createEntityAdapter,
    createEntityExtraReducers,
    createSlice,
    createSocketExtraReducers,
    extractReducersFromAdapter,
} from '@/store/utils';
import { ReduxToolkit } from '@/libs';
import { Servers, Conversations, Messages } from '@/store/features';



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

        createEntityExtraReducers({
            api: UsersApi,
            builder,
            addOne: adapter.addOne,
        });

        builder.addMatcher(
            ReduxToolkit.isAnyOf(
                UsersApi.endpoints.UserGetMany.matchFulfilled,
                UsersApi.endpoints.UserGetPossibleFriendsByName.matchFulfilled,
            ),
            adapter.upsertMany,
        );

        builder.addMatcher(
            ReduxToolkit.isAnyOf(
                UsersApi.endpoints.UserLogin.matchFulfilled,
                UsersApi.endpoints.UserRegistration.matchFulfilled,
                UsersApi.endpoints.UserRefresh.matchFulfilled,
                Servers.Api.endpoints.ServerGetManyDeep.matchFulfilled,
                Servers.Api.endpoints.ServerGetMembers.matchFulfilled,
                Servers.Api.endpoints.ServerGetBannedUsers.matchFulfilled,
                Conversations.Api.endpoints.ConversationGetManyDeep.matchFulfilled,
                Messages.Api.endpoints.MessageGetManyByTextChatId.matchFulfilled,
            ),
            (state, { payload }) => {
                const result = payload.User;

                if ('userData' in payload) {
                    result.push(payload.userData);
                }

                adapter.upsertMany(state, result);
            },
        );
    },
});