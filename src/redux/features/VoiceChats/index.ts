import { VoiceChatsApi } from './VoiceChatsApi';
import * as VoiceChatsSlice from './VoiceChatsSlice';



export namespace VoiceChats {
    export const Api = VoiceChatsApi;

    export const {
        Slice,
        StoreSelectors,
        Subscription,
    } = VoiceChatsSlice;

    export type State = VoiceChatsSlice.State;
}