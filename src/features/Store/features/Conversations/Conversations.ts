import * as types from './ConversationsTypes';
import * as slice from './ConversationsSlice';
import * as selectors from './ConversationsSelectors';
import * as api from './ConversationsApi';



export namespace Conversations {
    export import Types = types.ConversationsTypes;

    export import _Slice = slice.ConversationsSlice;

    export import Selectors = selectors;

    export import Api = api.ConversationsApi;
}