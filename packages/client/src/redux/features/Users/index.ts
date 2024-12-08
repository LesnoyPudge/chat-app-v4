import { UserApi } from './UsersApi';
import * as UserSlice from './UsersSlice';



export namespace User {
    export const Api = UserApi;

    export const {
        Slice,
    } = UserSlice;

    export type State = UserSlice.State;
}