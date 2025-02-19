import {
    createCustomEntityAdapter,
    createCustomSliceEntityAdapter,
    createEntitySubscription,
    createStoreSelectors,
} from '@redux/utils';
import { ClientEntities } from '@types';
import { VoiceChatsApi } from './VoiceChatsApi';
import { isAnyOf } from '@reduxjs/toolkit';
import { Users } from '../Users';
import { Servers } from '../Servers';
import { Conversations } from '../Conversations';



export type State = ClientEntities.VoiceChat.Base;

const name = 'VoiceChats';

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
                adapter.upsertMany(state, payload.VoiceChat);
            },
        );
    },
    selectors: {},
}, adapter);

export const { StoreSelectors } = createStoreSelectors({
    ...adapter.storeSelectors,
});