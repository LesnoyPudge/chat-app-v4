import * as c1 from './AppEffects';
import * as c2 from './AppSlice';



export namespace App {
    export import Effects = c1;

    export import Slice = c2.Slice;

    export import State = c2.State;
}