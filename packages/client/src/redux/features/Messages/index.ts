import { MessagesApi } from './MessagesApi';
import * as MessagesSlice from './MessagesSlice';



export namespace Messages {
    export const Api = MessagesApi;

    export const {
        Slice,
        StoreSelectors,
        Subscription,
    } = MessagesSlice;

    export type State = MessagesSlice.State;
}