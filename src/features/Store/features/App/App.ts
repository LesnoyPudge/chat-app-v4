import * as types from './AppTypes';
import * as slice from './AppSlice';
import * as effects from './AppEffects';
import * as selectors from './AppSelectors';



export namespace App {
    export import Types = types.AppTypes;

    export import _Slice = slice.AppSlice;

    export import Effects = effects.AppEffects;

    export import Selectors = selectors;
}