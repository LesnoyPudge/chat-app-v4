import * as c1 from './components';
import * as c2 from './context';
import * as c4 from './hooks';
import * as c5 from './types';



export namespace Overlay {
    export import Wrapper = c1.OverlayWrapper;

    export import Provider = c1.OverlayProvider;

    export import Context = c2.OverlayContext;

    export const { useControls } = c4;

    export import Types = c5;
}