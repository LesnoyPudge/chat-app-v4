import * as types from './TextChatsTypes';
import * as slice from './TextChatsSlice';
import * as selectors from './TextChatsSelectors';
import * as api from './TextChatsApi';



export namespace TextChats {
    export import Types = types.TextChatsTypes;

    export import _Slice = slice.TextChatsSlice;

    export import Selectors = selectors;

    export import Api = api.TextChatsApi;
}