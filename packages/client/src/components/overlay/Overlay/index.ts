import * as c1 from './components';
import * as c2 from './context';
import * as c3 from './utils';



export namespace Overlay {
    export import Context = c2.OverlayContext;

    export import Provider = c1.OverlayProvider;

    export import Presence = c1.OverlayPresence;

    export const {
        withProvider,
    } = c3;

    export import Consumer = c1.OverlayConsumerProxy;

    export import Wrapper = c1.OverlayWrapper;
}