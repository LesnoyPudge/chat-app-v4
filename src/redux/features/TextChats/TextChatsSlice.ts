import {
    createCustomEntityAdapter,
    createCustomSliceEntityAdapter,
    createEntitySubscription,
    createStoreSelectors,
} from '@redux/utils';
import { ClientEntities } from '@types';
import { TextChatsApi } from './TextChatsApi';
import { Users } from '../Users';
import { Channels } from '../Channels';
import { isAnyOf } from '@reduxjs/toolkit';
import { Servers } from '../Servers';
import { Conversations } from '../Conversations';



export type State = ClientEntities.TextChat.Base;

const name = 'TextChats';

const adapter = createCustomEntityAdapter<State>()(name, [
    'server',
    'conversation',
]);

export const {
    Subscription,
    createExtraReducers,
} = createEntitySubscription(name, adapter);

const initialState = adapter.getInitialState();

export const Slice = createCustomSliceEntityAdapter({
    name,
    initialState,
    reducers: (create) => ({}),
    extraReducers: (builder) => {
        createExtraReducers(builder);

        builder.addMatcher(
            isAnyOf(
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
    selectors: {},
}, adapter);

export const { StoreSelectors } = createStoreSelectors({
    ...adapter.storeSelectors,
});