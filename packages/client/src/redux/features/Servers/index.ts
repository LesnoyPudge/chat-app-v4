import { ServersApi } from './ServersApi';
import * as ServersSlice from './ServersSlice';



export namespace Servers {
    export const Api = ServersApi;

    export const {
        Slice,
    } = ServersSlice;

    export type State = ServersSlice.State;
}