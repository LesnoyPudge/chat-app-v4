import * as types from './VoiceChatsTypes';
import * as slice from './VoiceChatsSlice';
import * as selectors from './VoiceChatsSelectors';
import * as api from './VoiceChatsApi';



export namespace VoiceChats {
    export import Types = types.VoiceChatsTypes;

    export import _Slice = slice.VoiceChatsSlice;

    export import Selectors = selectors;

    export import Api = api.VoiceChatsApi;
}