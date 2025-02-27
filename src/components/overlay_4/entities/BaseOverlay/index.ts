import * as c1 from './components';
import * as c2 from './context';
import * as c3 from './types';



export namespace BaseOverlay {
    export import Wrapper = c1.BaseOverlayWrapper;

    export import Provider = c1.BaseOverlayProvider;

    export import Context = c2.BaseOverlayContext;

    export import Types = c3.Types;
}