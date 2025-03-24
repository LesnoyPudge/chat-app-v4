import { Direction } from '@/types';
import { RT } from '@lesnoypudge/types-utils-react/namespace';
import { isRef, useConst, useFunction, useLatest } from '@lesnoypudge/utils-react';
import {
    CSSProperties,
    Fragment,
    MutableRefObject,
    ReactNode,
    RefObject,
} from 'react';
import { ViewportList, ViewportListPropsBase } from 'react-viewport-list';



const getDefaultPrerenderCount = ({
    itemMargin,
    itemSize,
    viewportRef,
}: Pick<
    Required<VirtualRender.Options<unknown>>,
    'itemSize' | 'itemMargin' | 'viewportRef'
>) => {
    if (itemSize === 0) return 0;

    const viewport = (
        isRef(viewportRef)
            ? viewportRef.current ?? document.documentElement
            : viewportRef
    );
    const viewportHeight = viewport.clientHeight;
    const itemSizeWithMargin = itemSize + Math.max(0, itemMargin);

    return Math.ceil(viewportHeight / itemSizeWithMargin);
};

const DefaultRenderSpacer: VirtualRender.RenderSpacer = ({
    ref,
    style,
}) => {
    return (
        <div
            data-virtual-spacer
            ref={ref}
            style={style}
        >
        </div>
    );
};

export namespace VirtualRender {
    export type ScrollToIndexOptions = {
        index?: number;
        alignToTop?: boolean;
        offset?: number;
        delay?: number;
        prerender?: number;
    };

    export type Api = {
        scrollToIndex: (options: ScrollToIndexOptions) => void;
        getScrollPosition: () => {
            index: number;
            offset: number;
        };
    };

    export type WithApi = {
        apiRef?: MutableRefObject<Api | null>;
    };

    export type OnViewportIndexesChange = (
        (viewportIndexes: [number, number]) => void
    );

    export type RenderSpacer = (props: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref: MutableRefObject<any>;
        style: CSSProperties;
        type: 'top' | 'bottom';
    }) => ReactNode;

    export type GetItemBoundingClientRect = (
        element: Element
    ) => (
        DOMRect
        | {
            bottom: number;
            left: number;
            right: number;
            top: number;
            width: number;
            height: number;
        }
    );

    export type OverflowAnchor = 'none' | 'auto';

    export type GetId<_Item> = (item: _Item, index: number) => string | number;

    export type Options<_Item> = {
        items: _Item[] | undefined;
        getId: GetId<_Item>;
        viewportRef?: RefObject<HTMLElement | null> | HTMLElement;
        itemSize?: number;
        itemMargin?: number;
        overscan?: number;
        direction?: Direction.Single;
        initialIndex?: ScrollToIndexOptions['index'];
        initialAlignToTop?: ScrollToIndexOptions['alignToTop'];
        initialOffset?: ScrollToIndexOptions['offset'];
        initialDelay?: ScrollToIndexOptions['delay'];
        initialPrerender?: ScrollToIndexOptions['prerender'];
        onViewportIndexesChange?: OnViewportIndexesChange;
        overflowAnchor?: OverflowAnchor;
        withoutCache?: boolean;
        scrollThreshold?: number;
        indexesShift: number;
        getItemBoundingClientRect?: GetItemBoundingClientRect;
    };

    export type ChildrenArgs<_Item> = [
        item: _Item,
        index: number,
        array: _Item[],
    ];

    export type WithChildren<_Item> = RT.PropsWithRequiredRenderFunction<
        ChildrenArgs<_Item>
    >;

    export type Props<_Item> = (
        Options<_Item>
        & WithApi
        & WithChildren<_Item>
    );
}

export const VirtualRender = <_Item,>({
    apiRef,
    getId,
    direction = 'vertical',
    items = [],
    viewportRef,
    itemSize = 0,
    itemMargin = -1,
    overscan = 1,
    initialIndex = -1,
    initialAlignToTop = true,
    initialOffset = 0,
    initialDelay = -1,
    initialPrerender = getDefaultPrerenderCount({
        itemMargin,
        itemSize,
        viewportRef: viewportRef ?? document.documentElement,
    }),
    onViewportIndexesChange,
    overflowAnchor = 'auto',
    withoutCache = false,
    scrollThreshold = 0,
    indexesShift,
    getItemBoundingClientRect,
    children,
}: VirtualRender.Props<_Item>) => {
    const _viewportRef = useLatest(
        isRef(viewportRef) ? viewportRef.current : viewportRef,
    );
    // const _viewportRef = useConst(() => (
    //     isRef(viewportRef) ? viewportRef : { current: viewportRef }
    // ));

    const _children = useFunction((
        item: _Item,
        index: number,
        array: _Item[],
    ) => (
        <Fragment key={getId(item, index)}>
            {children(item, index, array)}
        </Fragment>
    ));

    const withCache = !withoutCache;
    const directionToAxis: ViewportListPropsBase['axis'] = (
        direction === 'horizontal'
            ? 'x'
            : 'y'
    );

    return (
        <ViewportList
            items={items}
            axis={directionToAxis}
            getItemBoundingClientRect={getItemBoundingClientRect}
            indexesShift={indexesShift}
            initialAlignToTop={initialAlignToTop}
            initialDelay={initialDelay}
            initialIndex={initialIndex}
            initialOffset={initialOffset}
            initialPrerender={initialPrerender}
            itemMargin={itemMargin}
            itemSize={itemSize}
            onViewportIndexesChange={onViewportIndexesChange}
            overflowAnchor={overflowAnchor}
            overscan={overscan}
            ref={apiRef}
            renderSpacer={DefaultRenderSpacer}
            scrollThreshold={scrollThreshold}
            // viewportRef={_viewportRef}
            withCache={withCache}
        >
            {_children}
        </ViewportList>
    );
};