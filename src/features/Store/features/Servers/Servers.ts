import * as types from './ServersTypes';
import * as slice from './ServersSlice';
import * as selectors from './ServersSelectors';
import * as api from './ServersApi';



export namespace Servers {
    export import Types = types.ServersTypes;

    export import _Slice = slice.ServersSlice;

    export import Selectors = selectors;

    export import Api = api.ServersApi;
}