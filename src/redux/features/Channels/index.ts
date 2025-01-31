import { ChannelsApi } from './ChannelsApi';
import * as ChannelsSlice from './ChannelsSlice';



export namespace Channels {
    export const Api = ChannelsApi;

    export const {
        Slice,
        StoreSelectors,
        Subscription,
    } = ChannelsSlice;

    export type State = ChannelsSlice.State;
}