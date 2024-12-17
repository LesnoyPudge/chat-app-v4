import { UsersApi } from './UsersApi';
import * as UserSlice from './UsersSlice';



export namespace User {
    export const Api = UsersApi;

    export const {
        Slice,
    } = UserSlice;

    export type State = UserSlice.State;
}