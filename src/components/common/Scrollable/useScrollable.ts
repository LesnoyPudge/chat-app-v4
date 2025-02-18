import { useDebounce, useIsMounted, useRefManager } from '@lesnoypudge/utils-react';
import type { Scrollable } from './Scrollable';
import { useLayoutEffect } from 'react';
import { addEventListener } from '@lesnoypudge/utils-web';
import { noop } from '@lesnoypudge/utils';



// const ATTRIBUTE_IS_SCROLLING = 'data-is-scrolling';
// const ATTRIBUTE_IS_HOVERED = 'data-is-hovered';
// const ATTRIBUTE_IS_FOCUSED = 'data-is-focused';
const ATTRIBUTE_IS_ALIVE = 'data-is-alive';

export const useScrollable = ({
    autoHide,
}: Required<Scrollable.Options>) => {
    const scrollableRef = useRefManager<HTMLDivElement>(null);
    const { debounce, isDebouncingRef } = useDebounce({ stateless: true });
    const { getIsMounted } = useIsMounted();

    useLayoutEffect(() => {
        return scrollableRef.effect((scrollable) => {
            const controller = new AbortController();
            const listenerOptions: AddEventListenerOptions = {
                passive: true,
                signal: controller.signal,
            };

            const triggerIsAlive = debounce(noop, 200);

            addEventListener(
                scrollable,
                'scroll',
                triggerIsAlive,
                listenerOptions,
            );

            return controller.abort;
        });
    }, [autoHide, scrollableRef]);

    return {
        scrollableRef,
    };
};