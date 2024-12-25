import {
    createCustomEntityAdapter,
    createCustomSliceEntityAdapter,
} from '@redux/utils';
import { ClientEntities } from '@types';
import { ServersApi } from './ServersApi';



export type State = ClientEntities.Server.Base;

const adapter = createCustomEntityAdapter<State>();

const initialState = adapter.getInitialState();

export const Slice = createCustomSliceEntityAdapter({
    name: 'ServersSlice',
    initialState,
    reducers: (create) => ({}),
    extraReducers: (builder) => {
        builder.addMatcher(
            ServersApi.endpoints.getOneByInvitationCode.matchFulfilled,
            adapter.extraReducers.upsertOne,
        );
        builder.addMatcher(
            ServersApi.endpoints.create.matchFulfilled,
            adapter.extraReducers.upsertOne,
        );
        builder.addMatcher(
            ServersApi.endpoints.acceptInvitation.matchFulfilled,
            adapter.extraReducers.upsertOne,
        );
    },
    selectors: {},
}, adapter);