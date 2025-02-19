import { useDebounce, useRefManager } from '@lesnoypudge/utils-react';
import type { Scrollable } from './Scrollable';
import { useLayoutEffect, useRef } from 'react';
import { addEventListener } from '@lesnoypudge/utils-web';
import { combinedFunction } from '@lesnoypudge/utils';



// const ATTRIBUTE_IS_SCROLLING = 'data-is-scrolling';
// const ATTRIBUTE_IS_HOVERED = 'data-is-hovered';
// const ATTRIBUTE_IS_FOCUSED = 'data-is-focused';
const ATTRIBUTE_IS_ALIVE = 'data-is-alive';
const DELAY = 3_000;

export const useScrollable = ({
    autoHide,
}: Required<Scrollable.Options>) => {
    const scrollableRef = useRefManager<HTMLDivElement>(null);
    const isAliveRef = useRef(false);
    const isScrollingRef = useRef(false);
    const isHoveredRef = useRef(false);
    const {
        debounce: scrollDebounce,
    } = useDebounce({ stateless: true });
    const {
        debounce: hoverEndDebounce,
    } = useDebounce({ stateless: true });

    useLayoutEffect(() => {
        console.log('eff');
        return scrollableRef.effect((scrollable) => {
            console.log('ref eff');
            const on = () => {
                if (isAliveRef.current) return;

                isAliveRef.current = true;
                scrollable.setAttribute(ATTRIBUTE_IS_ALIVE, 'true');
            };

            if (!autoHide) {
                scrollable.setAttribute(ATTRIBUTE_IS_ALIVE, 'true');
                return;
            }

            scrollable.setAttribute(ATTRIBUTE_IS_ALIVE, 'false');

            const off = () => {
                if (!isAliveRef.current) return;
                if (isScrollingRef.current) return;
                if (isHoveredRef.current) return;

                isAliveRef.current = false;
                scrollable.setAttribute(ATTRIBUTE_IS_ALIVE, 'false');
            };

            const handleScroll = () => {
                isScrollingRef.current = true;
                on();

                hoverEndDebounce(() => {
                    isScrollingRef.current = false;
                    off();
                }, DELAY)();
            };

            const handleMouseEnter = () => {
                isHoveredRef.current = true;
                on();
            };

            const handleMouseLeave = () => {
                isHoveredRef.current = false;

                scrollDebounce(off, DELAY)();
            };

            const cleanup = combinedFunction(
                addEventListener(
                    scrollable,
                    'scroll',
                    handleScroll,
                    { passive: true },
                ),

                addEventListener(
                    scrollable,
                    'mouseenter',
                    handleMouseEnter,
                ),

                addEventListener(
                    scrollable,
                    'mouseleave',
                    handleMouseLeave,
                ),
            );
            const id = Math.random();
            console.log(id);
            return () => {
                console.log('cleanup', id);
                cleanup();
            };
        });
    }, [autoHide, hoverEndDebounce, scrollDebounce, scrollableRef]);

    return {
        scrollableRef,
    };
};