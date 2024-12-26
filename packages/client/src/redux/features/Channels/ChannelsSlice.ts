import {
    createCustomEntityAdapter,
    createCustomSliceEntityAdapter,
    createStoreSelectors,
} from '@redux/utils';
import { ClientEntities } from '@types';
import { ChannelsApi } from './ChannelsApi';



export type State = ClientEntities.Channel.Base;

const adapter = createCustomEntityAdapter<State>();

const initialState = adapter.getInitialState();

export const Slice = createCustomSliceEntityAdapter({
    name: 'Channels',
    initialState,
    reducers: (create) => ({}),
    extraReducers: (builder) => {},
    selectors: {
        selectIdsByServerId: (state, serverId: string) => {
            const channels = adapter.selectors.selectAll(state);

            return channels.filter((channel) => {
                return channel.server === serverId;
            }).map((channel) => channel.id);
        },
    },
}, adapter);

export const { StoreSelectors } = createStoreSelectors({
    ...adapter.selectors,
});