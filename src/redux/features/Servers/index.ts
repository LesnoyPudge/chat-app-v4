import { ServersApi } from './ServersApi';
import * as ServersSlice from './ServersSlice';



export namespace Servers {
    export const Api = ServersApi;

    export const {
        Slice,
        StoreSelectors,
        Subscription,
    } = ServersSlice;

    export type State = ServersSlice.State;
}