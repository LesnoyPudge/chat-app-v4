import { useDebounce, useIsMounted, useRefManager } from '@lesnoypudge/utils-react';
import type { Scrollable } from './Scrollable';
import { useLayoutEffect } from 'react';
import { addEventListener } from '@lesnoypudge/utils-web';
import { combinedFunction, noop } from '@lesnoypudge/utils';



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

    // useLayoutEffect(() => {
    //     return scrollableRef.effect((scrollable) => {
    //         const triggerIsAlive = debounce(() => {
    //             console.log('triggerIsAlive');
    //         }, 1_000);

    //         const cleanup = combinedFunction(
    //             addEventListener(
    //                 scrollable,
    //                 'scroll',
    //                 triggerIsAlive,
    //                 { passive: true },
    //             ),

    //             addEventListener(
    //                 scrollable,
    //                 'mousedown',
    //                 () => console.log('mouseDown'),
    //             ),

    //             addEventListener(
    //                 scrollable,
    //                 'mouseup',
    //                 () => console.log('mouseUp'),
    //             ),
    //         );

    //         return cleanup;
    //     });
    // }, [autoHide, debounce, scrollableRef]);

    return {
        scrollableRef,
    };
};