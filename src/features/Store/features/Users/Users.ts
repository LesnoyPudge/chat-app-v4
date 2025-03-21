import * as types from './UsersTypes';
import * as slice from './UsersSlice';
import * as selectors from './UsersSelectors';
import * as api from './UsersApi';



export namespace Users {
    export import Types = types.UsersTypes;

    export import _Slice = slice.UsersSlice;

    export import Selectors = selectors;

    export import Api = api.UsersApi;
}