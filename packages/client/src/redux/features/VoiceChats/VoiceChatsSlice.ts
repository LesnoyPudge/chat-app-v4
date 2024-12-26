import {
    createCustomEntityAdapter,
    createCustomSliceEntityAdapter,
    createStoreSelectors,
} from '@redux/utils';
import { ClientEntities } from '@types';
import { VoiceChatsApi } from './VoiceChatsApi';



export type State = ClientEntities.VoiceChat.Base;

const adapter = createCustomEntityAdapter<State>();

const initialState = adapter.getInitialState();

export const Slice = createCustomSliceEntityAdapter({
    name: 'VoiceChats',
    initialState,
    reducers: (create) => ({}),
    extraReducers: (builder) => {},
    selectors: {},
}, adapter);

export const { StoreSelectors } = createStoreSelectors({});