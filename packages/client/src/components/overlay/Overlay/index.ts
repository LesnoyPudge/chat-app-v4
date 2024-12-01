import { OverlayProvider, OverlayWrapper } from './components';
import { OverlayContext } from './context';



export namespace Overlay {
    export const Context = OverlayContext;

    export type Context = OverlayContext;

    export import Provider = OverlayProvider;

    export import Wrapper = OverlayWrapper;
}