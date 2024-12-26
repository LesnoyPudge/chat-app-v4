import {
    createCustomEntityAdapter,
    createCustomSliceEntityAdapter,
    createStoreSelectors,
} from '@redux/utils';
import { ClientEntities } from '@types';
import { MessagesApi } from './MessagesApi';



export type State = ClientEntities.Message.Base;

const adapter = createCustomEntityAdapter<State>();

const initialState = adapter.getInitialState();

export const Slice = createCustomSliceEntityAdapter({
    name: 'Messages',
    initialState,
    reducers: (create) => ({}),
    extraReducers: (builder) => {},
    selectors: {},
}, adapter);

export const { StoreSelectors } = createStoreSelectors({});