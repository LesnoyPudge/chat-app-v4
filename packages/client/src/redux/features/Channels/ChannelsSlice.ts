import {
    createCustomEntityAdapter,
    createCustomSliceEntityAdapter,
    createEntitySubscription,
    createStoreSelectors,
} from '@redux/utils';
import { ClientEntities } from '@types';
import { ChannelsApi } from './ChannelsApi';
import { isAnyOf } from '@reduxjs/toolkit';
import { Users } from '../Users';



export type State = ClientEntities.Channel.Base;

const name = 'Channels';

const adapter = createCustomEntityAdapter<State>()(name, [
    'server',
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
            ),
            (state, { payload }) => {
                adapter.upsertMany(state, payload.Channel);
            },
        );

        builder.addMatcher(
            ChannelsApi.endpoints.getMany.matchFulfilled,
            adapter.upsertMany,
        );
    },
    selectors: {},
}, adapter);

export const { StoreSelectors } = createStoreSelectors({
    ...adapter.storeSelectors,
});