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

const adapter = createCustomEntityAdapter<State>()(name, [
    'server',
    'conversation',
]);

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
});