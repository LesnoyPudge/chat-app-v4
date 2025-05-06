import * as types from './MessagesTypes';
import * as slice from './MessagesSlice';
import * as selectors from './MessagesSelectors';
import * as api from './MessagesApi';
import * as effects from './MessagesEffects';



export namespace Messages {
    export import Types = types.MessagesTypes;

    export import _Slice = slice.MessagesSlice;

    export import Selectors = selectors;

    export import Api = api.MessagesApi;

    export import Effects = effects.MessagesEffects;
}