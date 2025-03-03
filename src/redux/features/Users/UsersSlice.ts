import { invariant } from '@lesnoypudge/utils';
import {
    createCustomEntityAdapter,
    createCustomSliceEntityAdapter,
    createEntitySubscription,
    createStoreSelectors,
} from '@/redux/utils';
import { ClientEntities } from '@/types';
import { App } from '../App';
import { UsersApi } from './UsersApi';
import { isAnyOf } from '@reduxjs/toolkit';
import { Servers } from '../Servers';
import { Conversations } from '../Conversations';



export type State = ClientEntities.User.Base;

const name = 'Users';

const adapter = createCustomEntityAdapter<State>()(name, []);

export const {
    Subscription,
    createExtraReducers,
} = createEntitySubscription(name, adapter);

const initialState = adapter.getInitialState();

export const Slice = createCustomSliceEntityAdapter({
    name,
    initialState,
    reducers: (create) => ({}),
    selectors: {},
    extraReducers: (builder) => {
        createExtraReducers(builder);

        builder.addMatcher(
            isAnyOf(
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
            isAnyOf(
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
}, adapter);

export const { StoreSelectors } = createStoreSelectors({
    ...adapter.storeSelectors,
    selectMe: (state) => {
        const myId = App.Slice.selectors.selectUserId()(state.App);
        invariant(myId, 'id not found');

        const me = StoreSelectors.selectById(myId)(state);
        invariant(me, 'authorized user not found');

        return me;
    },
});