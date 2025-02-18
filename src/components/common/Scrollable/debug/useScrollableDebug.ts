import { useFunction, useIsFirstRender } from '@lesnoypudge/utils-react';
import { logger } from '@utils';
import { useLayoutEffect, useRef } from 'react';
import { getElementFillableSize, getElementObject, mountExpander } from '../utils';
import { Scrollable } from '../Scrollable';



const useScrollableDebug = ({
    autoHide,
    size,
}: Pick<Required<Scrollable.Options>, 'autoHide' | 'size'>) => {
    const debugRef = useRef<HTMLDivElement>(null);
    const shouldReportCheckWindowOverflowRef = useRef(true);
    const shouldReportCheckParentOverflowRef = useRef(true);

    const { isFirstRender } = useIsFirstRender();

    if (autoHide && isFirstRender) {
        logger.log('autoHide not implemented');
    }

    if (size === 'hidden' && isFirstRender) {
        logger.log('size `hidden` is deprecated, use different size with autoHide');
    }

    const checkWindowOverflow = useFunction(() => {
        if (!shouldReportCheckWindowOverflowRef.current) return;

        const scrollableElement = debugRef.current;
        if (!scrollableElement) return;

        const parentElement = scrollableElement.parentElement;
        if (!parentElement) return;

        const { remove } = mountExpander(scrollableElement);

        const isOverflowingWindow = (
            window.innerHeight < scrollableElement.clientHeight
            || window.innerWidth < scrollableElement.clientWidth
        );

        remove();

        if (
            isOverflowingWindow
            && shouldReportCheckWindowOverflowRef.current
        ) {
            shouldReportCheckWindowOverflowRef.current = false;
            logger.warn(
                `scrollable is overflowing window`,
                getElementObject(scrollableElement),
            );
        }
    });

    const checkParentOverflow = useFunction(() => {
        if (!shouldReportCheckParentOverflowRef.current) return;

        const scrollableElement = debugRef.current;
        if (!scrollableElement) return;

        const parentElement = scrollableElement.parentElement;
        if (!parentElement) return;

        const originalParentOverflow = parentElement.style.overflow;


        parentElement.style.overflow = 'hidden';

        const { remove } = mountExpander(scrollableElement);

        const parentRect = parentElement.getBoundingClientRect();
        const scrollableRect = scrollableElement.getBoundingClientRect();

        const isOverflowingParent = (
            parentRect.height < scrollableRect.height
            || parentRect.width < scrollableRect.width
        );
        if (
            isOverflowingParent
            && shouldReportCheckParentOverflowRef.current
        ) {
            shouldReportCheckParentOverflowRef.current = false;

            logger.warn(
                `scrollable is overflowing parent.`,
                getElementObject(scrollableElement),
                { parentElement },
                getElementFillableSize(parentElement),
            );
        }

        remove();

        parentElement.style.overflow = originalParentOverflow;
    });

    useLayoutEffect(checkWindowOverflow);
    // useAnimationFrame(checkWindowOverflow, true);

    useLayoutEffect(checkParentOverflow);
    // useAnimationFrame(checkParentOverflow, true);

    return debugRef;
};

export default useScrollableDebug;