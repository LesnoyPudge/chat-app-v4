import { TextChatsApi } from './TextChatsApi';
import * as TextChatsSlice from './TextChatsSlice';



export namespace TextChats {
    export const Api = TextChatsApi;

    export const {
        Slice,
        StoreSelectors,
        Subscription,
    } = TextChatsSlice;

    export type State = TextChatsSlice.State;
}