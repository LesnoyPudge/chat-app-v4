import { useTimeout } from '@lesnoypudge/utils-react';
import { logger } from '@utils';
import { MutableRefObject } from 'react';



type ElementObj = {
    element: HTMLElement;
    scrollHeight: number;
    clientHeight: number;
};

const useScrollableDebug = (
    debugRef: MutableRefObject<HTMLDivElement | null>,
) => {
    useTimeout(() => {
        const scrollableElement = debugRef.current;
        if (!scrollableElement) return;

        const parentElement = scrollableElement.parentElement;
        if (!parentElement) return;

        const getElementObject = (
            element: HTMLElement,
        ): ElementObj => {
            return {
                element,
                scrollHeight: element.scrollHeight,
                clientHeight: element.clientHeight,
            };
        };

        const expander = document.createElement('div');

        expander.style.minHeight = '9999px';
        expander.style.minWidth = '9999px';

        scrollableElement.append(expander);

        const isOverflowing = (
            window.innerHeight < scrollableElement.clientHeight
        );

        const diff = (
            scrollableElement.clientHeight
            - window.innerHeight
        );

        expander.remove();

        if (isOverflowing) {
            logger.warn(
                `scrollable is overflowing by`,
                `${diff} - 9999 = ${diff - 9_999}`,
                getElementObject(scrollableElement),
            );
        }
    }, 2_000);
};

export default useScrollableDebug;