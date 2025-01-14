import {
    createCustomEntityAdapter,
    createCustomSliceEntityAdapter,
    createEntitySubscription,
    createStoreSelectors,
} from '@redux/utils';
import { ClientEntities } from '@types';
import { ChannelsApi } from './ChannelsApi';



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
            ChannelsApi.endpoints.getMany.matchFulfilled,
            adapter.upsertMany,
        );
    },
    selectors: {},
}, adapter);

export const { StoreSelectors } = createStoreSelectors({
    ...adapter.storeSelectors,
});