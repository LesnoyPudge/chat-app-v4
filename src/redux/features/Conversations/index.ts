import { ConversationsApi } from './ConversationsApi';
import * as ConversationsSlice from './ConversationsSlice';



export namespace Conversations {
    export const Api = ConversationsApi;

    export const {
        Slice,
        StoreSelectors,
        Subscription,
    } = ConversationsSlice;

    export type State = ConversationsSlice.State;
}