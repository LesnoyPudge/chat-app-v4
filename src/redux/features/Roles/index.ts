import { RolesApi } from './RolesApi';
import * as RolesSlice from './RolesSlice';



export namespace Roles {
    export const Api = RolesApi;

    export const {
        Slice,
        StoreSelectors,
        Subscription,
    } = RolesSlice;

    export type State = RolesSlice.State;
}