import {
    createCustomEntityAdapter,
    createCustomSliceEntityAdapter,
    createStoreSelectors,
} from '@redux/utils';
import { ClientEntities } from '@types';
import { ConversationsApi } from './ConversationsApi';



export type State = ClientEntities.Conversation.Base;

const adapter = createCustomEntityAdapter<State>();

const initialState = adapter.getInitialState();

export const Slice = createCustomSliceEntityAdapter({
    name: 'Conversations',
    initialState,
    reducers: (create) => ({}),
    extraReducers: (builder) => {},
    selectors: {},
}, adapter);

export const { StoreSelectors } = createStoreSelectors({});