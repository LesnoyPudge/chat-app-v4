import {
    createCustomEntityAdapter,
    createCustomSliceEntityAdapter,
    createStoreSelectors,
} from '@redux/utils';
import { ClientEntities } from '@types';
import { TextChatsApi } from './TextChatsApi';
import { Users } from '../Users';
import { Channels } from '../Channels';



export type State = ClientEntities.TextChat.Base;

const name = 'TextChats';

const adapter = createCustomEntityAdapter<State, typeof name>(name);

const initialState = adapter.getInitialState();

export const Slice = createCustomSliceEntityAdapter({
    name,
    initialState,
    reducers: (create) => ({}),
    extraReducers: (builder) => {},
    selectors: {},
}, adapter);

export const { StoreSelectors } = createStoreSelectors({
    ...adapter.storeSelectors,
    selectByServerId: (state, serverId: string) => {
        const channelIds = (
            Channels.Slice.selectors.selectIdsByServerId(
                serverId,
            )(state.Channels)
        );

        const textChats = StoreSelectors.selectAll()(state);

        const foundTextChats = textChats.filter((textChat) => {
            return channelIds.includes(textChat.channel);
        });

        return foundTextChats;
    },
});