import { decorate } from '@lesnoypudge/macro';
import { withDisplayName } from '@lesnoypudge/utils-react';
import {
    useState,
    useRef,
    Fragment,
    useImperativeHandle,
    useMemo,
    MutableRefObject,
    forwardRef,
    ForwardedRef,
    RefObject,
    CSSProperties,
    memo,
    ReactNode,
} from 'react';
import {
    IS_OVERFLOW_ANCHOR_SUPPORTED,
    IS_TOUCH_DEVICE,
    PROP_NAME_FOR_X_AXIS,
    PROP_NAME_FOR_Y_AXIS,
    SHOULD_DELAY_SCROLL,
    findElement,
    findNearestScrollableElement,
    generateArray,
    getDiff,
    getStyle,
    normalizeValue,
    useIsomorphicLayoutEffect,
} from './extra';



decorate(withDisplayName, 'ViewportListInner', decorate.target);
decorate(memo, decorate.target);
decorate(forwardRef, decorate.target);

const ViewportListInner = <_Item,>({
    items = [],
    count,
    children,
    viewportRef,
    itemSize = 0,
    itemMargin = -1,
    overscan = 1,
    axis = 'y',
    initialIndex = -1,
    initialAlignToTop = true,
    initialOffset = 0,
    initialDelay = -1,
    initialPrerender = 0,
    onViewportIndexesChange,
    overflowAnchor = 'auto',
    withCache = true,
    scrollThreshold = 0,
    renderSpacer = ({ ref, style }) => <div ref={ref} style={style}/>,
    indexesShift = 0,
    getItemBoundingClientRect = (element) => element.getBoundingClientRect(),
}: (
    ViewportList.Types.PropsBase
    & {
        items?: _Item[];
        count?: number;
        children: (...args: any) => any;
    }
),
    ref: ForwardedRef<ViewportList.Types.Api>,
) => {
    const propName = axis === 'y' ? PROP_NAME_FOR_Y_AXIS : PROP_NAME_FOR_X_AXIS;
    const withCount = typeof count === 'number';
    const maxIndex = (withCount ? count : items.length) - 1;

    const [
        [estimatedItemHeight, estimatedItemMargin],
        setItemDimensions,
    ] = useState(() => [
        normalizeValue(0, itemSize),
        normalizeValue(-1, itemMargin),
    ]);

    const itemHeightWithMargin = normalizeValue(
        0,
        estimatedItemHeight + estimatedItemMargin,
    );

    const overscanSize = normalizeValue(
        0,
        Math.ceil(overscan * itemHeightWithMargin),
    );

    const [indexes, setIndexes] = useState(() => {
        return [
            initialIndex - initialPrerender,
            initialIndex + initialPrerender,
        ] as [number, number];
    });

    const anchorElementRef = useRef<Element | null>(null);
    const anchorIndexRef = useRef<number>(-1);
    const topSpacerRef = useRef<any>(null);
    const bottomSpacerRef = useRef<any>(null);
    const ignoreOverflowAnchorRef = useRef(false);
    const lastIndexesShiftRef = useRef(indexesShift);
    const cacheRef = useRef<number[]>([]);

    const scrollToIndexOptionsRef = useRef<
        Required<ViewportList.Types.ScrollToIndexOptions> | null
    >(
        initialIndex >= 0
            ? {
                    index: initialIndex,
                    alignToTop: initialAlignToTop,
                    offset: initialOffset,
                    delay: initialDelay,
                    prerender: initialPrerender,
                }
            : null,
    );

    const scrollToIndexTimeoutIdRef = useRef<any>(null);
    const marginTopRef = useRef(0);
    const viewportIndexesRef = useRef<[number, number]>([-1, -1]);
    const scrollTopRef = useRef<number | null>(null);

    const [startIndex, endIndex] = useMemo(() => {
        indexes[0] = normalizeValue(0, indexes[0], maxIndex);
        indexes[1] = normalizeValue(indexes[0], indexes[1], maxIndex);

        const shift = indexesShift - lastIndexesShiftRef.current;

        lastIndexesShiftRef.current = indexesShift;

        const topSpacer = topSpacerRef.current;

        if (topSpacer && shift) {
            indexes[0] = normalizeValue(0, indexes[0] + shift, maxIndex);
            indexes[1] = normalizeValue(indexes[0], indexes[1] + shift, maxIndex);
            anchorElementRef.current = topSpacer.nextSibling as Element;
            anchorIndexRef.current = indexes[0];
            ignoreOverflowAnchorRef.current = true;
        }

        return indexes;
    }, [indexesShift, indexes, maxIndex]);

    const topSpacerStyle = useMemo(() => {
        const cache = (withCache ? cacheRef.current : []);
        const size = (
            cache
                .slice(0, startIndex)
                .reduce<number>((sum, next) => {
                    return sum + (next - estimatedItemHeight);
                }, startIndex * itemHeightWithMargin)
        );

        return getStyle(
            propName,
            size,
            marginTopRef.current,
        );
    }, [
        propName,
        withCache,
        startIndex,
        itemHeightWithMargin,
        estimatedItemHeight,
    ]);

    const bottomSpacerStyle = useMemo(() => {
        const cache = (withCache ? cacheRef.current : []);

        return getStyle(
            propName,
            cache
                .slice(endIndex + 1, maxIndex + 1)
                .reduce<number>((sum, next) => {
                    return sum + (next - estimatedItemHeight);
                }, itemHeightWithMargin * (maxIndex - endIndex)),
        );
    }, [
        propName,
        withCache,
        endIndex,
        maxIndex,
        itemHeightWithMargin,
        estimatedItemHeight,
    ]);

    const getViewport = useMemo(() => {
        let autoViewport: any = null;

        return () => {
            if (viewportRef) {
                if (viewportRef.current === document.body) {
                    return document.documentElement;
                }

                return viewportRef.current;
            }

            if (autoViewport?.isConnected) {
                return autoViewport;
            }

            const topSpacer = topSpacerRef.current;

            if (!topSpacer) {
                return null;
            }

            autoViewport = findNearestScrollableElement(
                propName,
                topSpacer.parentNode,
            );

            return autoViewport;
        };
    }, [propName, viewportRef]);

    const mainFrameRef = useRef(() => {});
    const getScrollPositionRef = useRef(() => ({ index: -1, offset: 0 }));

    useIsomorphicLayoutEffect(() => {
        mainFrameRef.current = () => {
            const viewport = getViewport();
            const topSpacer = topSpacerRef.current;
            const bottomSpacer = bottomSpacerRef.current;

            if (!viewport || !topSpacer || !bottomSpacer) {
                return;
            }

            const topElement = topSpacer.nextSibling as Element;
            const bottomElement = bottomSpacer.previousSibling as Element;
            const viewportRect = viewport.getBoundingClientRect();
            const topSpacerRect = topSpacer.getBoundingClientRect();
            const bottomSpacerRect = bottomSpacer.getBoundingClientRect();
            const limits = {
                [propName.top]: viewport === document.documentElement ? 0 : viewportRect[propName.top],
                [propName.bottom]:
                    viewport === document.documentElement
                        ? document.documentElement[propName.clientHeight]
                        : viewportRect[propName.bottom],
            };
            const limitsWithOverscanSize = {
                [propName.top]: limits[propName.top] - overscanSize,
                [propName.bottom]: limits[propName.bottom] + overscanSize,
            };

            if (
                (marginTopRef.current < 0
                    && topSpacerRect[propName.top] - marginTopRef.current >= limitsWithOverscanSize[propName.top])
                || (marginTopRef.current > 0 && topSpacerRect[propName.top] >= limitsWithOverscanSize[propName.top])
                || (marginTopRef.current && scrollToIndexOptionsRef.current)
            ) {
                topSpacer.style[propName.marginTop] = '0px';
                viewport.style[propName.overflowY] = 'hidden';
                viewport[propName.scrollTop] += -marginTopRef.current;
                viewport.style[propName.overflowY] = '';
                marginTopRef.current = 0;

                return;
            }

            if (estimatedItemHeight === 0 || estimatedItemMargin === -1) {
                let itemsHeightSum = 0;

                findElement({
                    fromElement: topElement,
                    toElement: bottomSpacer,
                    fromIndex: startIndex,
                    compare: (element) => {
                        itemsHeightSum += getItemBoundingClientRect(element)[propName.height];

                        return false;
                    },
                });

                if (!itemsHeightSum) {
                    return;
                }

                const renderedItemsCount = endIndex - startIndex + 1;
                const nextItemHeight
                    = estimatedItemHeight === 0 ? Math.ceil(itemsHeightSum / renderedItemsCount) : estimatedItemHeight;
                const nextItemMargin
                    = estimatedItemMargin === -1
                        ? Math.ceil(
                                (bottomSpacerRect[propName.top] - topSpacerRect[propName.bottom] - itemsHeightSum)
                                / renderedItemsCount,
                            )
                        : estimatedItemMargin;

                setItemDimensions([nextItemHeight, nextItemMargin]);

                return;
            }

            if (scrollToIndexTimeoutIdRef.current) {
                return;
            }

            if (scrollToIndexOptionsRef.current) {
                const targetIndex = normalizeValue(0, scrollToIndexOptionsRef.current.index, maxIndex);

                if (targetIndex < startIndex || targetIndex > endIndex) {
                    setIndexes([
                        targetIndex - scrollToIndexOptionsRef.current.prerender,
                        targetIndex + scrollToIndexOptionsRef.current.prerender,
                    ]);

                    return;
                }

                const [targetElement] = findElement({
                    fromElement: topElement,
                    toElement: bottomSpacer,
                    fromIndex: startIndex,
                    compare: (_, index) => index === targetIndex,
                });

                if (!targetElement) {
                    return;
                }

                const { alignToTop, offset, delay } = scrollToIndexOptionsRef.current;

                scrollToIndexOptionsRef.current = null;

                const scrollToElement = () => {
                    const elementRect = getItemBoundingClientRect(targetElement);
                    const shift = alignToTop
                        ? elementRect[propName.top] - limits[propName.top] + offset
                        : elementRect[propName.bottom]
                            - limits[propName.top]
                            - viewport[propName.clientHeight]
                            + offset;

                    viewport[propName.scrollTop] += shift;
                    scrollToIndexTimeoutIdRef.current = null;
                };
                const scrollToElementDelay = delay < 0 && SHOULD_DELAY_SCROLL ? 30 : delay;

                if (scrollToElementDelay > 0) {
                    scrollToIndexTimeoutIdRef.current = setTimeout(scrollToElement, scrollToElementDelay);

                    return;
                }

                scrollToElement();

                return;
            }

            if (scrollTopRef.current === null) {
                scrollTopRef.current = viewport.scrollTop;
            } else if (scrollTopRef.current !== viewport.scrollTop) {
                const diff = Math.abs(viewport.scrollTop - scrollTopRef.current);

                scrollTopRef.current = viewport.scrollTop;

                if (scrollThreshold > 0 && diff > scrollThreshold) {
                    return;
                }
            }

            const topSecondElement = topElement === bottomSpacer ? bottomSpacer : (topElement.nextSibling as Element);
            const bottomSecondElement
                = bottomElement === topSpacer ? topSpacer : (bottomElement.previousSibling as Element);
            const averageSize = Math.ceil(
                (bottomSpacerRect[propName.top] - topSpacerRect[propName.bottom]) / (endIndex + 1 - startIndex),
            );
            const isAllAboveTop = topSpacerRect[propName.bottom] > limitsWithOverscanSize[propName.bottom];
            const isAllBelowBottom = bottomSpacerRect[propName.top] < limitsWithOverscanSize[propName.top];
            const isTopBelowTop
                = !isAllAboveTop
                    && !isAllBelowBottom
                    && topSpacerRect[propName.bottom] > limitsWithOverscanSize[propName.top];
            const isBottomAboveBottom
                = !isAllAboveTop
                    && !isAllBelowBottom
                    && bottomSpacerRect[propName.top] < limitsWithOverscanSize[propName.bottom];
            const isBottomSecondAboveTop
                = !isAllAboveTop
                    && !isAllBelowBottom
                    && (bottomSecondElement === topSpacer ? topSpacerRect : getItemBoundingClientRect(bottomSecondElement))[
                        propName.bottom
                    ] > limitsWithOverscanSize[propName.bottom];
            const isTopSecondAboveTop
                = !isAllAboveTop
                    && !isAllBelowBottom
                    && (topSecondElement === bottomSpacer ? bottomSpacerRect : getItemBoundingClientRect(topSecondElement))[
                        propName.top
                    ] < limitsWithOverscanSize[propName.top];
            let nextStartIndex = startIndex;
            let nextEndIndex = endIndex;

            if (isAllAboveTop) {
                nextStartIndex -= getDiff(
                    topSpacerRect[propName.bottom],
                    limitsWithOverscanSize[propName.top],
                    averageSize,
                );
                nextEndIndex -= getDiff(
                    bottomSpacerRect[propName.top],
                    limitsWithOverscanSize[propName.bottom],
                    averageSize,
                );
            }

            if (isAllBelowBottom) {
                nextEndIndex += getDiff(
                    bottomSpacerRect[propName.top],
                    limitsWithOverscanSize[propName.bottom],
                    averageSize,
                );
                nextStartIndex += getDiff(
                    topSpacerRect[propName.bottom],
                    limitsWithOverscanSize[propName.top],
                    averageSize,
                );
            }

            if (isTopBelowTop) {
                nextStartIndex -= getDiff(
                    topSpacerRect[propName.bottom],
                    limitsWithOverscanSize[propName.top],
                    averageSize,
                );
            }

            if (isBottomAboveBottom) {
                nextEndIndex += getDiff(
                    bottomSpacerRect[propName.top],
                    limitsWithOverscanSize[propName.bottom],
                    averageSize,
                );
            }

            if (isBottomSecondAboveTop) {
                const [, index] = findElement({
                    fromElement: bottomElement,
                    toElement: topSpacer,
                    fromIndex: endIndex,
                    asc: false,
                    compare: (element) =>
                        getItemBoundingClientRect(element)[propName.bottom] <= limitsWithOverscanSize[propName.bottom],
                });

                if (index !== -1) {
                    nextEndIndex = index + 1;
                }
            }

            if (isTopSecondAboveTop) {
                const [, index] = findElement({
                    fromElement: topElement,
                    toElement: bottomSpacer,
                    fromIndex: startIndex,
                    compare: (element) =>
                        getItemBoundingClientRect(element)[propName.top] >= limitsWithOverscanSize[propName.top],
                });

                if (index !== -1) {
                    nextStartIndex = index - 1;
                }
            }

            if (onViewportIndexesChange) {
                let [, startViewportIndex] = findElement({
                    fromElement: topElement,
                    toElement: bottomSpacer,
                    fromIndex: startIndex,
                    compare: (element) => getItemBoundingClientRect(element)[propName.bottom] > limits[propName.top],
                });

                if (startViewportIndex === -1) {
                    startViewportIndex = startIndex;
                }

                let [, endViewportIndex] = findElement({
                    fromElement: bottomElement,
                    toElement: topSpacer,
                    fromIndex: endIndex,
                    asc: false,
                    compare: (element) => getItemBoundingClientRect(element)[propName.top] < limits[propName.bottom],
                });

                if (endViewportIndex === -1) {
                    endViewportIndex = endIndex;
                }

                if (
                    startViewportIndex !== viewportIndexesRef.current[0]
                    || endViewportIndex !== viewportIndexesRef.current[1]
                ) {
                    viewportIndexesRef.current = [startViewportIndex, endViewportIndex];
                    onViewportIndexesChange(viewportIndexesRef.current);
                }
            }

            nextStartIndex = normalizeValue(0, nextStartIndex, maxIndex);
            nextEndIndex = normalizeValue(nextStartIndex, nextEndIndex, maxIndex);

            if (nextStartIndex === startIndex && nextEndIndex === endIndex) {
                return;
            }

            if (nextStartIndex !== startIndex) {
                if (startIndex >= nextStartIndex) {
                    anchorElementRef.current = topElement;
                    anchorIndexRef.current = startIndex;
                } else {
                    const [anchorElement, anchorElementIndex] = findElement({
                        fromElement: topElement,
                        toElement: bottomSpacer,
                        fromIndex: startIndex,
                        compare: (element, index) => {
                            if (index === nextStartIndex) {
                                return true;
                            }

                            const elementRect = getItemBoundingClientRect(element);

                            if (elementRect[propName.height] !== estimatedItemHeight) {
                                cacheRef.current[index] = elementRect[propName.height];
                            }

                            return false;
                        },
                    });

                    if (anchorElement) {
                        anchorElementRef.current = anchorElement;
                        anchorIndexRef.current = anchorElementIndex;
                    } else {
                        anchorElementRef.current = bottomElement;
                        anchorIndexRef.current = endIndex;
                    }
                }
            }

            setIndexes([nextStartIndex, nextEndIndex]);
        };

        getScrollPositionRef.current = () => {
            const viewport = getViewport();
            const topSpacer = topSpacerRef.current;
            const bottomSpacer = bottomSpacerRef.current;

            let scrollIndex = -1;
            let scrollOffset = 0;

            if (!viewport || !topSpacer || !bottomSpacer) {
                return { index: scrollIndex, offset: scrollOffset };
            }

            const topElement = topSpacer.nextSibling as Element;
            const viewportRect = viewport.getBoundingClientRect();
            const limits = {
                [propName.top]: viewport === document.documentElement ? 0 : viewportRect[propName.top],
                [propName.bottom]:
                    viewport === document.documentElement
                        ? document.documentElement[propName.clientHeight]
                        : viewportRect[propName.bottom],
            };

            findElement({
                fromElement: topElement,
                toElement: bottomSpacer,
                fromIndex: startIndex,
                compare: (element, index) => {
                    const rect = getItemBoundingClientRect(element);

                    scrollIndex = index;
                    scrollOffset = limits[propName.top] - rect[propName.top];

                    return rect[propName.bottom] > limits[propName.top];
                },
            });

            return { index: scrollIndex, offset: scrollOffset };
        };
    });

    let anchorHeightOnRender: number | undefined;

    if (anchorElementRef.current && getViewport() && topSpacerRef.current) {
        anchorHeightOnRender
            = getItemBoundingClientRect(anchorElementRef.current)[propName.top]
                - (getViewport() === document.documentElement ? 0 : getViewport().getBoundingClientRect()[propName.top]);
    }

    useIsomorphicLayoutEffect(() => {
        anchorElementRef.current = null;

        const anchorIndex = anchorIndexRef.current;
        const ignoreOverflowAnchor = ignoreOverflowAnchorRef.current;

        anchorIndexRef.current = -1;
        ignoreOverflowAnchorRef.current = false;

        const viewport = getViewport();
        const topSpacer = topSpacerRef.current;
        const bottomSpacer = bottomSpacerRef.current;

        if (
            anchorIndex === -1
            || !viewport
            || !topSpacer
            || !bottomSpacer
            || anchorHeightOnRender === undefined
            || (IS_OVERFLOW_ANCHOR_SUPPORTED && overflowAnchor !== 'none' && !ignoreOverflowAnchor)
        ) {
            return;
        }

        let top = null;

        if (anchorIndex >= startIndex && anchorIndex <= endIndex) {
            const [anchorElement] = findElement({
                fromElement: topSpacer.nextSibling as Element,
                toElement: bottomSpacer,
                fromIndex: startIndex,
                compare: (_, index) => index === anchorIndex,
            });

            if (anchorElement) {
                top = getItemBoundingClientRect(anchorElement)[propName.top];
            }
        } else {
            if (anchorIndex < startIndex) {
                top
                    = topSpacer.getBoundingClientRect()[propName.top]
                        + (withCache ? cacheRef.current : [])
                            .slice(0, anchorIndex)
                            .reduce<number>((sum, next) => sum + (next - estimatedItemHeight), anchorIndex * itemHeightWithMargin);
            } else if (anchorIndex <= maxIndex) {
                top
                    = bottomSpacer.getBoundingClientRect()[propName.top]
                        + (withCache ? cacheRef.current : [])
                            .slice(endIndex + 1, anchorIndex)
                            .reduce<number>(
                                (sum, next) => sum + (next - estimatedItemHeight),
                                itemHeightWithMargin * (anchorIndex - 1 - endIndex),
                            );
            }
        }

        if (top === null) {
            return;
        }

        const offset
            = top
                - (viewport === document.documentElement ? 0 : viewport.getBoundingClientRect()[propName.top])
                - anchorHeightOnRender;

        if (!offset) {
            return;
        }

        if (IS_TOUCH_DEVICE) {
            marginTopRef.current -= offset;
            topSpacer.style[propName.marginTop] = `${marginTopRef.current}px`;

            return;
        }

        viewport[propName.scrollTop] += offset;
    }, [startIndex]);

    useIsomorphicLayoutEffect(() => {
        let frameId: number;
        const frame = () => {
            frameId = requestAnimationFrame(frame);
            mainFrameRef.current();
        };

        frame();

        return () => {
            cancelAnimationFrame(frameId);

            if (scrollToIndexTimeoutIdRef.current) {
                clearTimeout(scrollToIndexTimeoutIdRef.current);
            }
        };
    }, []);

    useImperativeHandle(
        ref,
        () => ({
            scrollToIndex: ({ index = -1, alignToTop = true, offset = 0, delay = -1, prerender = 0 }) => {
                scrollToIndexOptionsRef.current = { index, alignToTop, offset, delay, prerender };
                mainFrameRef.current();
            },
            getScrollPosition: () => getScrollPositionRef.current(),
        }),
        [],
    );

    const topSpacer = renderSpacer({
        ref: topSpacerRef,
        style: topSpacerStyle,
        type: 'top',
    });

    const bottomSpacer = renderSpacer({
        ref: bottomSpacerRef,
        style: bottomSpacerStyle,
        type: 'bottom',
    });

    const elements = (
        (!!count || !!items.length)
            ? generateArray(
                    startIndex,
                    endIndex + 1,
                    withCount
                        ? children
                        : (index) => children(items[index], index, items),
                )
            : null
    );

    return (
        <Fragment>
            {topSpacer}

            {elements}

            {bottomSpacer}
        </Fragment>
    );
};


export namespace ViewportList {
    export namespace Types {
        export type ScrollToIndexOptions = {
            index?: number;
            alignToTop?: boolean;
            offset?: number;
            delay?: number;
            prerender?: number;
        };

        export type Api = {
            scrollToIndex: (options: ScrollToIndexOptions) => void;
            getScrollPosition: () => { index: number; offset: number };
        };

        export type PropsBase = {
            viewportRef?:
                | MutableRefObject<HTMLElement | null>
                | RefObject<HTMLElement | null>
                | { current: HTMLElement | null }
                | null;
            itemSize?: number;
            itemMargin?: number;
            overscan?: number;
            axis?: 'y' | 'x';
            initialIndex?: ScrollToIndexOptions['index'];
            initialAlignToTop?: ScrollToIndexOptions['alignToTop'];
            initialOffset?: ScrollToIndexOptions['offset'];
            initialDelay?: ScrollToIndexOptions['delay'];
            initialPrerender?: ScrollToIndexOptions['prerender'];
            onViewportIndexesChange?: (viewportIndexes: [number, number]) => void;
            overflowAnchor?: 'none' | 'auto';
            withCache?: boolean;
            scrollThreshold?: number;
            renderSpacer?: (props: { ref: MutableRefObject<any>; style: CSSProperties; type: 'top' | 'bottom' }) => any;
            indexesShift?: number;
            getItemBoundingClientRect?: (element: Element) =>
                | DOMRect
                | {
                    bottom: number;
                    left: number;
                    right: number;
                    top: number;
                    width: number;
                    height: number;
                };
        };

        export type WithItems<_Item> = {
            count?: never;
            items: _Item[] | undefined;
            children: (
                item: _Item, index: number, array: _Item[]
            ) => ReactNode;
        };

        export type PropsWithItems<_Item> = (
            PropsBase
            & WithItems<_Item>
        );

        export type WithCount = {
            count: number;
            items?: never;
            children: (index: number) => ReactNode;
        };

        export type PropsWithCount = (
            PropsBase
            & WithCount
        );

        type WithRef = {
            ref?: ForwardedRef<Api>;
        };

        export type Node = {
            <_Item>(props: (
                PropsWithItems<_Item>
                & WithRef
            )): ReturnType<typeof ViewportListInner>;

            (props: (
                PropsWithCount
                & WithRef
            )): ReturnType<typeof ViewportListInner>;
        };
    }

    export const Node = ViewportListInner as Types.Node;
}