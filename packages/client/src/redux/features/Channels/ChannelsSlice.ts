import {
    createCustomEntityAdapter,
    createCustomSliceEntityAdapter,
    createStoreSelectors,
} from '@redux/utils';
import { ClientEntities } from '@types';
import { ChannelsApi } from './ChannelsApi';



export type State = ClientEntities.Channel.Base;

const name = 'Channels';

const adapter = createCustomEntityAdapter<State, typeof name>(name);

const initialState = adapter.getInitialState();

export const Slice = createCustomSliceEntityAdapter({
    name,
    initialState,
    reducers: (create) => ({}),
    extraReducers: (builder) => {},
    selectors: {
        selectIdsByServerId: (state, serverId: string) => {
            const channels = Object.values(state.entities);

            return channels.filter((channel) => {
                return channel.server === serverId;
            }).map((channel) => channel.id);
        },
    },
}, adapter);

export const { StoreSelectors } = createStoreSelectors({
    ...adapter.storeSelectors,
});