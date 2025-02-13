import { useAnimationFrame, useRefManager } from '@lesnoypudge/utils-react';
import { useLayoutEffect, useRef } from 'react';
import { expandElement, getElementFillableSize, mountExpander } from './utils';



const onResize = (scrollableElement: HTMLElement | null) => {
    if (!scrollableElement) return;

    const parentElement = scrollableElement.parentElement;
    if (!parentElement) return;

    console.log('onResize');

    const originalParentOverflow = parentElement.style.overflow;

    parentElement.style.overflow = 'hidden';

    const { shrink } = expandElement(scrollableElement);

    const {
        fillableHeight,
        fillableWidth,
    } = getElementFillableSize(parentElement);

    shrink();

    scrollableElement.style.maxHeight = `${fillableHeight}px`;
    scrollableElement.style.maxWidth = `${fillableWidth}px`;

    parentElement.style.overflow = originalParentOverflow;
};

export const useScrollableMaxSize = () => {
    const scrollableRef = useRefManager<HTMLElement>(null);
    const timeoutIdRef = useRef<number>();



    // useLayoutEffect(() => {
    //     return scrollableRef.effect((scrollableElement) => {
    //         const parentElement = scrollableElement.parentElement;
    //         if (!parentElement) return;

    //         const resizeObserver = new ResizeObserver((() => {
    //             clearTimeout(timeoutIdRef.current);

    //             timeoutIdRef.current = setTimeout(() => {
    //                 onResize(scrollableElement);
    //             });
    //         }));

    //         const mutationObserver = new MutationObserver(() => {
    //             clearTimeout(timeoutIdRef.current);

    //             timeoutIdRef.current = setTimeout(() => {
    //                 onResize(scrollableElement);
    //             });
    //         });
    //         console.log(parentElement);
    //         resizeObserver.observe(parentElement);
    //         // mutationObserver.observe(parentElement, {
    //         //     attributes: true,
    //         // });

    //         return () => {
    //             clearTimeout(timeoutIdRef.current);
    //             resizeObserver.unobserve(parentElement);
    //             mutationObserver.disconnect();
    //         };
    //     });
    // }, [scrollableRef]);

    // useAnimationFrame(() => {
    //     onResize(scrollableRef.current);
    // }, true);

    // useLayoutEffect(() => {
    //     return scrollableRef.effect((node) => {
    //         onResize(node);
    //     });
    // }, [scrollableRef]);

    return {
        scrollableRef,
    };
};