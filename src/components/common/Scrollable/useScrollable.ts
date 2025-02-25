import { useDebounce, useFunction, useIsFocused, useRefManager } from '@lesnoypudge/utils-react';
import type { Scrollable } from './Scrollable';
import { useEffect, useRef } from 'react';
import { addEventListener } from '@lesnoypudge/utils-web';
import { combinedFunction } from '@lesnoypudge/utils';



// const ATTRIBUTE_IS_SCROLLING = 'data-is-scrolling';
// const ATTRIBUTE_IS_HOVERED = 'data-is-hovered';
// const ATTRIBUTE_IS_FOCUSED = 'data-is-focused';
const ATTRIBUTE_IS_ALIVE = 'data-is-alive';
const STAY_ALIVE_DELAY = 3_000;

export const useScrollable = ({
    autoHide,
}: Required<Scrollable.Options>) => {
    const scrollableRef = useRefManager<HTMLDivElement>(null);
    const isAliveRef = useRef(false);
    const isScrollingRef = useRef(false);
    const isHoveredRef = useRef(false);
    const isFocusedRef = useRef(false);

    const { debounce: scrollDebounce } = useDebounce({ stateless: true });
    const { debounce: hoverEndDebounce } = useDebounce({ stateless: true });
    const { debounce: focusEndDebounce } = useDebounce({ stateless: true });

    const on = useFunction(() => {
        const scrollable = scrollableRef.current;
        if (!scrollable) return;
        if (isAliveRef.current) return;

        isAliveRef.current = true;
        scrollable.setAttribute(ATTRIBUTE_IS_ALIVE, 'true');
    });

    const off = useFunction(() => {
        const scrollable = scrollableRef.current;
        if (!scrollable) return;
        if (!isAliveRef.current) return;
        if (isScrollingRef.current) return;
        if (isHoveredRef.current) return;
        if (isFocusedRef.current) return;

        isAliveRef.current = false;
        scrollable.setAttribute(ATTRIBUTE_IS_ALIVE, 'false');
    });

    useIsFocused(scrollableRef, {
        visible: true,
        within: true,
        stateless: true,
        onFocus: () => {
            isFocusedRef.current = true;
            on();
        },
        onBlur: () => {
            focusEndDebounce(() => {
                isFocusedRef.current = false;
                off();
            }, STAY_ALIVE_DELAY)();
        },
    });

    useEffect(() => {
        return scrollableRef.effect((scrollable) => {
            if (!scrollable) return;

            if (!autoHide) {
                scrollable.setAttribute(ATTRIBUTE_IS_ALIVE, 'true');
                return;
            }

            scrollable.setAttribute(ATTRIBUTE_IS_ALIVE, 'false');

            const handleScroll = () => {
                isScrollingRef.current = true;
                on();

                scrollDebounce(() => {
                    isScrollingRef.current = false;
                    off();
                }, STAY_ALIVE_DELAY)();
            };

            const handleMouseEnter = () => {
                isHoveredRef.current = true;
                on();
            };

            const handleMouseLeave = () => {
                isHoveredRef.current = false;

                hoverEndDebounce(off, STAY_ALIVE_DELAY)();
            };

            return combinedFunction(
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
        });
    }, [autoHide, hoverEndDebounce, off, on, scrollDebounce, scrollableRef]);

    return {
        scrollableRef,
    };
};