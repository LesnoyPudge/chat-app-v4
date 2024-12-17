import {
    createCustomEntityAdapter,
    createCustomSliceEntityAdapter,
} from '@redux/utils';
import { ClientEntities } from '@types';



export type State = ClientEntities.User.Base;

const adapter = createCustomEntityAdapter<State>();

const initialState = adapter.getInitialState();

export const Slice = createCustomSliceEntityAdapter({
    name: 'UsersSlice',
    initialState,
    reducers: (create) => ({}),
    selectors: {},
}, adapter);