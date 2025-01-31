import {
    useConst,
    useEventListener,
    useFunction,
} from '@lesnoypudge/utils-react';
import { hotKey } from '@lesnoypudge/utils-web';



export namespace useHotKey {
    export type ElementType = useEventListener.ElementUnion;

    export type Element<
        _ElementType extends ElementType,
    > = useEventListener.ProvidedElement<
        _ElementType
    >;

    export type KeyCombo = hotKey.KeyCombo;

    export type KeyCombos = KeyCombo[];

    export type Handler = (e: KeyboardEvent) => void;

    export type Options = {
        eventListenerOption?: AddEventListenerOptions;
        hotKeyOptions?: hotKey.HotKeyOptions;
    };
}

export const useHotKey = <
    _ElementType extends useHotKey.ElementType,
>(
    element: useHotKey.Element<_ElementType>,
    keyCombo: useHotKey.KeyCombo | useHotKey.KeyCombos,
    handler: useHotKey.Handler,
    options?: useHotKey.Options,
) => {
    const _handler = useFunction(handler);
    const hotKeyHandler = useConst(() => {
        const keyCombos = (
            Array.isArray(keyCombo[0])
                ? keyCombo as useHotKey.KeyCombos
                : [keyCombo] as useHotKey.KeyCombos
        );
        return hotKey.make(...keyCombos)(
            _handler,
            options?.hotKeyOptions,
        );
    });

    useEventListener(
        element,
        'keydown',
        hotKeyHandler,
        options?.eventListenerOption,
    );
};