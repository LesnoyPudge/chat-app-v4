import { useFunction } from '@lesnoypudge/utils-react';
import { useKeyboardNavigationContextSelector } from '../../context';
import { Types } from '../../types';
import { useEffect } from 'react';



export const useKeyboardNavigationOnMove: Types.useOnMove.Fn = (
    nextItemId,
    listener,
) => {
    const instance = useKeyboardNavigationContextSelector(
        (v) => v.instance,
    );

    const _listener: typeof listener = useFunction((props) => {
        if (!props.isFromEvent) return;
        if (nextItemId && (props.next.id !== nextItemId)) return;
        if (props.next.id === props.prev?.id) return;

        listener(props);
    });

    useEffect(() => {
        return instance.onIdChange(_listener);
    }, [_listener, instance]);
};