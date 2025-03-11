import { Scrollable } from '@/components';
import { logger } from '@/utils';
import { useLayoutEffect } from 'react';



const getHorizontalScrollbarSize = (scrollable: HTMLElement) => {
    scrollable.style.position = 'relative';
    scrollable.style.paddingTop = '0px';
    scrollable.style.paddingBottom = '0px';

    const rect = scrollable.getBoundingClientRect();

    const div = document.createElement('div');

    div.style.position = 'absolute';
    div.style.inset = '0px';

    scrollable.append(div);

    const innerRect = div.getBoundingClientRect();

    div.remove();

    scrollable.style.position = '';
    scrollable.style.paddingTop = '';
    scrollable.style.paddingBottom = '';

    return rect.height - innerRect.height;
};

// for some reason, opposite gutter (both-edges) does not apply
// to horizontal orientation (at least in chrome).
export const useOppositeGutter = ({
    scrollableRef,
    withOppositeGutter,
    withoutGutter,
    direction,
}: Scrollable.useScrollable.Hooks.Props) => {
    const shouldFixGutter = (
        withOppositeGutter
        && !withoutGutter
        && direction !== 'vertical'
    );

    useLayoutEffect(() => {
        if (!shouldFixGutter) return;

        const scrollable = scrollableRef.current;
        if (!scrollable) return;

        // fixed in css?
        return;

        // console.log(scrollable.getBoundingClientRect());

        // const size = getHorizontalScrollbarSize(scrollable);
        // return;
        return scrollableRef.effect((scrollable) => {
            if (!scrollable) return;

            const computed = window.getComputedStyle(scrollable);
            const size = getHorizontalScrollbarSize(scrollable);

            if (size <= 0) {
                logger.warn(
                    `horizontal scrollbar size should not be ${size}`,
                    scrollable,
                );
            }

            const newPadding = Number.parseFloat(computed.paddingTop) + size;

            scrollable.style.paddingTop = `${newPadding}px`;

            return () => {
                scrollable.style.paddingTop = '';
            };
        });
    }, [scrollableRef, shouldFixGutter]);
};