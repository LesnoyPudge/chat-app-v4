import * as c1 from './components';
import * as c2 from './context';
import * as c3 from './utils';
import * as c4 from './hooks';
import * as c5 from './types';



export namespace Overlay {
    export import Consumer = c1.OverlayConsumerProxy;

    export import Wrapper = c1.OverlayWrapper;

    export import Provider = c1.OverlayProvider;

    export import Presence = c1.OverlayPresence;

    export import Context = c2.OverlayContext;

    export const { withProvider } = c3;

    export const { useOverlayControls } = c4;

    export import Types = c5;
}