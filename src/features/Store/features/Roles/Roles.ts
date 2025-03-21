import * as types from './RolesTypes';
import * as slice from './RolesSlice';
import * as selectors from './RolesSelectors';
import * as api from './RolesApi';



export namespace Roles {
    export import Types = types.RolesTypes;

    export import _Slice = slice.RolesSlice;

    export import Selectors = selectors;

    export import Api = api.RolesApi;
}