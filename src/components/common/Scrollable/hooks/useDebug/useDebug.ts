import { useFunction } from '@lesnoypudge/utils-react';
import { logger } from '@/utils';
import { useEffect, useRef } from 'react';
import {
    getElementFillableSize,
    getElementObject,
    mountExpander,
} from './utils';
import { Scrollable } from '@/components';



export const useDebug = ({
    instanceRef,
}: Scrollable.Hooks.WithInstanceRef) => {
    const shouldReportCheckWindowOverflowRef = useRef(true);
    const shouldReportCheckParentOverflowRef = useRef(true);

    const checkWindowOverflow = useFunction(() => {
        if (!shouldReportCheckWindowOverflowRef.current) return;

        const instance = instanceRef.current;
        if (!instance) return;

        const scrollableElement = instance.elements().viewport;

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

        const instance = instanceRef.current;
        if (!instance) return;

        const elements = instance.elements();

        const scrollableElement = elements.viewport;

        const parentElement = elements.host.parentElement;
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