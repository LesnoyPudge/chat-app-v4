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

const adapter = createCustomEntityAdapter<State>();

const initialState = adapter.getInitialState();

export const Slice = createCustomSliceEntityAdapter({
    name: 'TextChats',
    initialState,
    reducers: (create) => ({}),
    extraReducers: (builder) => {},
    selectors: {},
}, adapter);

export const { StoreSelectors } = createStoreSelectors({
    selectByServerId: (state, serverId: string) => {
        const channelIds = (
            Channels.Slice.selectors.selectIdsByServerId(serverId)(state)
        );

        const textChats = Slice.selectors.selectAll()(state);

        const foundTextChats = textChats.filter((textChat) => {
            return channelIds.includes(textChat.channel);
        });

        return foundTextChats;
    },
});