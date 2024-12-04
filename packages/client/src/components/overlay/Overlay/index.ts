import {
    OverlayProvider,
    OverlayWrapper,
    OverlayConsumerProxy,
} from './components';
import { OverlayContext } from './context';



export namespace Overlay {
    export const Context = OverlayContext;

    export type Context = OverlayContext;

    export import Provider = OverlayProvider;

    export const Consumer = OverlayConsumerProxy;

    export import Wrapper = OverlayWrapper;
}