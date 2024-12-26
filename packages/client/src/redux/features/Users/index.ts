import { UsersApi } from './UsersApi';
import * as UserSlice from './UsersSlice';



export namespace Users {
    export const Api = UsersApi;

    export const {
        Slice,
        StoreSelectors,
    } = UserSlice;

    export type State = UserSlice.State;
}