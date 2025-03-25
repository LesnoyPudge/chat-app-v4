import { ContextSelectable, useFunction } from '@lesnoypudge/utils-react';
import { KeyboardNavigationContext } from '../../context';
import { Types } from '../../types';
import { useEffect } from 'react';



export const useKeyboardNavigationOnMove: Types.useOnMove.Fn = (
    nextItemId,
    listener,
) => {
    const on = ContextSelectable.useSelector(
        KeyboardNavigationContext,
        (v) => v.on,
    );
    const _listener: typeof listener = useFunction((props) => {
        if (nextItemId !== null && props.next.id !== nextItemId) return;

        listener(props);
    });

    useEffect(() => on(_listener), [_listener, on]);
};