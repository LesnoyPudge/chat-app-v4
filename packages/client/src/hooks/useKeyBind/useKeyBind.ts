import {
    useConst,
    useEventListener,
    useFunction,
} from '@lesnoypudge/utils-react';
import { hotKey } from '@lesnoypudge/utils-web';



export namespace useKeyBind {
    export type ElementType = useEventListener.ElementUnion;

    export type Element<
        _ElementType extends ElementType,
    > = useEventListener.ProvidedElement<
        _ElementType
    >;

    export type KeyCombo = hotKey.KeyCombo;

    export type Handler = (e: KeyboardEvent) => void;
}

export const useKeyBind = <
    _ElementType extends useKeyBind.ElementType,
>(
    element: useKeyBind.Element<_ElementType>,
    keyCombo: useKeyBind.KeyCombo,
    handler: useKeyBind.Handler,
    options?: AddEventListenerOptions,
) => {
    const _handler = useFunction(handler);
    const hotKeyHandler = useConst(() => hotKey.make(keyCombo)(_handler));

    useEventListener(element, 'keydown', hotKeyHandler, options);
};