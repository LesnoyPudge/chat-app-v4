import { invariant } from '@lesnoypudge/utils';
import {
    createCustomEntityAdapter,
    createCustomSliceEntityAdapter,
    createStoreSelectors,
} from '@redux/utils';
import { ClientEntities } from '@types';
import { App } from '../App';
import { UsersApi } from './UsersApi';
import { isAnyOf } from '@reduxjs/toolkit';



export type State = ClientEntities.User.Base;

const name = 'Users';

const adapter = createCustomEntityAdapter<State>()(name, []);

const initialState = adapter.getInitialState();

export const Slice = createCustomSliceEntityAdapter({
    name,
    initialState,
    reducers: (create) => ({}),
    selectors: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            isAnyOf(
                UsersApi.endpoints.login.matchFulfilled,
                UsersApi.endpoints.registration.matchFulfilled,
                UsersApi.endpoints.refresh.matchFulfilled,
                UsersApi.endpoints.refresh.matchFulfilled,
                UsersApi.endpoints.unmuteServer.matchFulfilled,
                UsersApi.endpoints.muteServer.matchFulfilled,
                UsersApi.endpoints.markServerNotificationsAsRead.matchFulfilled,
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