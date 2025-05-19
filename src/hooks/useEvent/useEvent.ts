import { ListenerStore } from '@lesnoypudge/utils';
import {
    useConst,
    useFunction,
    useUnmountEffect,
} from '@lesnoypudge/utils-react';
import { useEffect } from 'react';



export namespace useEvent {
    export type On<
        _Args extends unknown[] = unknown[],
    > = (callback: ListenerStore.Callback<_Args>) => VoidFunction;

    export type Off<
        _Args extends unknown[] = unknown[],
    > = (callback: ListenerStore.Callback<_Args>) => void;

    export type Trigger<
        _Args extends unknown[] = unknown[],
    > = (...args: _Args) => void;

    export type Return<
        _Args extends unknown[] = unknown[],
    > = {
        on: On<_Args>;
        off: Off<_Args>;
        trigger: Trigger<_Args>;
    };
}

export const useEvent = <_Args extends unknown[] = unknown[]>() => {
    const {
        add,
        remove,
        removeAll,
        triggerAll,
    } = useConst(() => new ListenerStore<null, _Args>());

    const on: useEvent.On<_Args> = useFunction((listener) => {
        return add(null, listener);
    });

    const off: useEvent.Off<_Args> = useFunction((listener) => {
        remove(null, listener);
    });

    useUnmountEffect(removeAll);

    return {
        on,
        off,
        trigger: triggerAll,
    };
};