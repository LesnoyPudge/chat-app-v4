import { useEffect, useLayoutEffect } from 'react';



export const IS_SSR = typeof window === 'undefined';

export const IS_TOUCH_DEVICE = (
    !IS_SSR
    && (() => {
        try {
            return 'ontouchstart' in window || navigator.maxTouchPoints;
        } catch {
            return false;
        }
    })()
);

export const IS_OVERFLOW_ANCHOR_SUPPORTED = (
    !IS_SSR
    && (() => {
        try {
            return window.CSS.supports('overflow-anchor: auto');
        } catch {
            return false;
        }
    })()
);

export const SHOULD_DELAY_SCROLL = (
    IS_TOUCH_DEVICE
    && !IS_OVERFLOW_ANCHOR_SUPPORTED
);

export const PROP_NAME_FOR_Y_AXIS = {
    top: 'top',
    bottom: 'bottom',
    clientHeight: 'clientHeight',
    scrollHeight: 'scrollHeight',
    scrollTop: 'scrollTop',
    overflowY: 'overflowY',
    height: 'height',
    minHeight: 'minHeight',
    maxHeight: 'maxHeight',
    marginTop: 'marginTop',
} as const;

export const PROP_NAME_FOR_X_AXIS = {
    top: 'left',
    bottom: 'right',
    scrollHeight: 'scrollWidth',
    clientHeight: 'clientWidth',
    scrollTop: 'scrollLeft',
    overflowY: 'overflowX',
    minHeight: 'minWidth',
    height: 'width',
    maxHeight: 'maxWidth',
    marginTop: 'marginLeft',
} as const;

export const normalizeValue = (
    min: number,
    value: number,
    max = Infinity,
) => Math.max(Math.min(value, max), min);

export const getDiff = (
    value1: number,
    value2: number,
    step: number,
) => Math.ceil(Math.abs(value1 - value2) / step);

export const useIsomorphicLayoutEffect = IS_SSR ? useEffect : useLayoutEffect;

export const generateArray = <_Item>(
    from: number,
    to: number,
    generate: (index: number) => _Item,
): _Item[] => {
    const array = [];

    for (let index = from; index < to; index++) {
        array.push(generate(index));
    }

    return array;
};

export const findElement = ({
    fromElement,
    toElement,
    fromIndex,
    asc = true,
    compare,
}: {
    fromElement: Element;
    toElement: Element;
    fromIndex: number;
    asc?: boolean;
    compare: (element: Element, index: number) => boolean;
}) => {
    let index = fromIndex;
    let element: Element | null = fromElement;

    while (element && element !== toElement) {
        if (compare(element, index)) {
            return [element, index] as const;
        }

        if (asc) {
            index++;
            element = element.nextSibling as Element | null;
        } else {
            index--;
            element = element.previousSibling as Element | null;
        }
    }

    return [null, -1] as const;
};

export const SCROLLABLE_REGEXP = /auto|scroll/gi;

export const findNearestScrollableElement = (
    propName: typeof PROP_NAME_FOR_Y_AXIS | typeof PROP_NAME_FOR_X_AXIS,
    node: Element | null,
): Element | null => {
    if (
        !node
        || node === document.body
        || node === document.documentElement
    ) {
        return document.documentElement;
    }

    const style = window.getComputedStyle(node);

    if (
        SCROLLABLE_REGEXP.test(style[propName.overflowY])
        || SCROLLABLE_REGEXP.test(style.overflow)
    ) {
        return node;
    }

    return findNearestScrollableElement(
        propName,
        node.parentNode as Element | null,
    );
};

export const getStyle = (
    propName: typeof PROP_NAME_FOR_Y_AXIS | typeof PROP_NAME_FOR_X_AXIS,
    size: number,
    marginTop = 0,
) => ({
    padding: 0,
    margin: 0,
    border: 'none',
    visibility: 'hidden',
    overflowAnchor: 'none',
    [propName.minHeight]: size,
    [propName.height]: size,
    [propName.maxHeight]: size,
    [propName.marginTop]: marginTop,
}) as const;