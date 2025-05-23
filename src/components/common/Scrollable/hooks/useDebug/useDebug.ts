import { useFunction, useInterval } from '@lesnoypudge/utils-react';
import { logger } from '@/utils';
import { useEffect, useRef } from 'react';
import {
    getElementFillableSize,
    getElementObject,
    mountExpander,
} from './utils';
import { Scrollable } from '@/components';
import { toOneLine } from '@lesnoypudge/utils';



type Props = (
    Scrollable.Hooks.WithInstanceRef
    & Pick<
        Required<Scrollable.Props>,
        'className'
    >
);

// const CHECK_DELAY = 1_000;

export const useDebug = ({
    instanceRef,
    className,
}: Props) => {
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
            // debugger;
            shouldReportCheckWindowOverflowRef.current = false;
            logger._warns.warn(
                `scrollable is overflowing window`,
                getElementObject(scrollableElement),
            );
        }

        remove();
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

            logger._warns.warn(
                `scrollable is overflowing parent.`,
                getElementObject(scrollableElement),
                { parentElement },
                getElementFillableSize(parentElement),
            );
        }

        remove();

        parentElement.style.overflow = originalParentOverflow;
    });

    const checkInvalidClassName = useFunction(() => {
        const invalidClasses: string[] = [
            'flex', 'grid', 'gap-', 'p-',
        ];

        const isInvalid = toOneLine(
            className,
        ).split(' ').some((appliedClass) => {
            return invalidClasses.some((invalidClass) => {
                return appliedClass.startsWith(invalidClass);
            });
        });

        if (isInvalid) {
            logger._warns.warn(toOneLine(`
                Scrollable: found invalid classes in ${className}`,
            ));
        }
    });

    useEffect(checkWindowOverflow);
    useEffect(checkParentOverflow);
    useEffect(checkInvalidClassName);

    // useInterval(checkWindowOverflow, CHECK_DELAY);
    // useInterval(checkParentOverflow, CHECK_DELAY);
    // useInterval(checkInvalidClassName, CHECK_DELAY);
};