import * as types from './ChannelsTypes';
import * as slice from './ChannelsSlice';
import * as selectors from './ChannelsSelectors';
import * as api from './ChannelsApi';



export namespace Channels {
    export import Types = types.ChannelsTypes;

    export import _Slice = slice.ChannelsSlice;

    export import Selectors = selectors;

    export import Api = api.ChannelsApi;
}