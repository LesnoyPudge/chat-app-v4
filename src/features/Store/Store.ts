import * as types from './types';
import * as utils from './utils';
import * as features from './features';
import * as hooks from './hooks';



export namespace Store {
    export import Utils = utils;

    export import Types = types.StoreTypes;

    export const {
        useActions,
        useSelector,
        useSliceSelector,
    } = hooks;

    export import App = features.App;

    export import Channels = features.Channels;

    export import Conversations = features.Conversations;

    export import Messages = features.Messages;

    export import Roles = features.Roles;

    export import Servers = features.Servers;

    export import TextChats = features.TextChats;

    export import Users = features.Users;
}