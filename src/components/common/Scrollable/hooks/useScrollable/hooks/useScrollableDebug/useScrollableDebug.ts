import { useFunction } from '@lesnoypudge/utils-react';
import { logger } from '@/utils';
import { useEffect, useLayoutEffect, useRef } from 'react';
import {
    getElementFillableSize,
    getElementObject,
    mountExpander,
} from './utils';
import { Scrollable } from '../../../../Scrollable';



const useScrollableDebug = ({
    scrollableRef,
}: Scrollable.useScrollable.Hooks.Props) => {
    const shouldReportCheckWindowOverflowRef = useRef(true);
    const shouldReportCheckParentOverflowRef = useRef(true);

    const checkWindowOverflow = useFunction(() => {
        if (!shouldReportCheckWindowOverflowRef.current) return;

        const scrollableElement = scrollableRef.current;
        if (!scrollableElement) return;

        const parentElement = scrollableElement.parentElement;
        if (!parentElement) return;

        const { remove } = mountExpander(scrollableElement);

        const isOverflowingWindow = (
            window.innerHeight < scrollableElement.clientHeight
            || window.innerWidth < scrollableElement.clientWidth
        );

        if (isOverflowingWindow) {
            shouldReportCheckWindowOverflowRef.current = false;
            logger.warn(
                `scrollable is overflowing window`,
                getElementObject(scrollableElement),
            );
        } else {
            remove();
        }
    });

    const checkParentOverflow = useFunction(() => {
        if (!shouldReportCheckParentOverflowRef.current) return;

        const scrollableElement = scrollableRef.current;
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
        if (isOverflowingParent) {
            shouldReportCheckParentOverflowRef.current = false;

            logger.warn(
                `scrollable is overflowing parent.`,
                getElementObject(scrollableElement),
                { parentElement },
                getElementFillableSize(parentElement),
            );
        }

        if (!isOverflowingParent) remove();

        parentElement.style.overflow = originalParentOverflow;
    });

    useEffect(checkWindowOverflow);

    useEffect(checkParentOverflow);
};

export default useScrollableDebug;